import EditMechVitalsDialog from '../../../dialog/EditMechVitalsDialog';
import LancerActorSheet from '../LancerActorSheet';

export default class MechSheet extends LancerActorSheet {
	allowedItemTypes = [
		'gear',
		'mount',
		'reaction',
		'system',
		'trait',
		'weapon',
	];

	mountedWeaponIds: string[] = [];

	constructor(data, options) {
		super(data, options);
	}

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["character", "sheet", "actor"],
			width: 675,
			height: 725,
			tabs: [
				{
					group: 'primary',
					navSelector: '.tabs',
					contentSelector: '.content',
					initial: 'traits'
				}
			],
		});
	}

	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/actor/mech/mech-sheet.hbs`;
	}

	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		html.find('.edit-vitals').on('click', async (ev) => {
			new EditMechVitalsDialog(this.actor).render(true);
		});

		html.find('.roll-structure').on('click', this.rollStructure.bind(this));
		html.find('.roll-stress').on('click', this.rollStress.bind(this));
		html.find('.full-repair').on('click', () => {
			const content =
				`
			<p>
				Perform a Full Repair? A full repair will will:
				<ul>
					<li>Restore Mech to full <strong>HP</strong> <strong>STRESS</strong> and <strong>STRUCTURE</strong></li>
					<li>Clear all Conditions</li>
					<li>Repair destroyed Weapons and Systems</li>
					<li>Recover CP</li>
					<li>Regain all <strong>REPAIRS</strong> and uses of <strong>LIMITED</strong> Weapons and Systems</li>
				</ul>
			</p>
			`;

			Dialog.confirm({
				title: 'Confirm Full Repair',
				content: content,
				yes: this.fullRepair.bind(this),
				no: () => { },
				defaultYes: false
			});
		});

		const dragDrop = new DragDrop({
			dragSelector: ".weapon-card",
			dropSelector: ".mount-card",
			//@ts-expect-error
			permissions: { dragstart: this._canDragStart.bind(this), drop: this._canDragDrop.bind(this) },
			callbacks: { dragstart: this._onDragWeaponCard.bind(this), drop: this._onDropWeaponCard.bind(this) }
		});

		dragDrop.bind(html[0]);
	}

	/** @override */
	override async getData() {
		const data: any = super.getData();
		const actor: any = this.actor;

		this.mountedWeaponIds = [];

		data.action_systems = [];
		data.core_systems = [];
		data.gear = [];
		data.mounts = [];
		data.nomount = [];
		data.passive_systems = [];
		data.protocols = [];
		data.reactions = [];
		data.tech_systems = [];
		data.traits = [];
		data.weapons = [];

		await actor.items.forEach(async (i: any) => {
			switch (i.type) {
				case 'gear':
					data.gear.push(i);
					break;
				case 'mount':
					const mount = await this.buildMount(i);
					data.mounts.push(mount);
					break;
				case 'reaction':
					data.reactions.push(i);
					break;
				case 'system':
					switch (i.system.type) {
						case 'action':
							data.action_systems.push(i);
							break;
						case 'core':
							data.core_systems.push(i);
							break;
						case 'passive':
							data.passive_systems.push(i);
							break;
						case 'protocol':
							data.protocols.push(i);
							break;
						case 'tech':
							data.tech_systems.push(i);
							break;
					}
					break;
				case 'trait':
					data.traits.push(i);
					break;
				case 'weapon':
					data.weapons.push(i);
					break;
			}
		});

		// todo: sort
		const sortByName = (a: any, b: any) => {
			if (a.name > b.name) {
				return 1;
			}
			else if (b.name > a.name) {
				return -1;
			}
			else {
				return 0;
			}
		}

		data.action_systems.sort(sortByName);
		data.core_systems.sort(sortByName);
		data.passive_systems.sort(sortByName);
		data.protocols.sort(sortByName);
		data.tech_systems.sort(sortByName);

		// Populate nomount w/ unmounted weapons
		data.weapons.forEach((w: any) => {
			if (!this.mountedWeaponIds.includes(w.id)) {
				data.nomount.push(w);
			}
		});

		return data;
	}

	protected override async _onDropItem(event: DragEvent, data: ActorSheet.DropData.Item): Promise<unknown> {
		if (!this.actor.isOwner) {
			return false;
		}

		const item = await CONFIG.Item.documentClass.bind(this).fromDropData(data);
		if (!item) {
			return false;
		}

		if (!this.allowedItemTypes.includes(item.type)) {
			ui.notifications?.error('Mechs cannot use this item!');
			console.log("Preventing addition of new item: Invalid item type for this actor type! " + '(' + this.actor.type + '/' + item.type + ')');
			event.preventDefault();
			return;
		}

		if (this.actor.uuid === item.parent?.uuid) {
			return this._onSortItem(event, item.toObject()) as Promise<Item[]>;
		}

		return super._onDropItem(event, data);
	}

	/**
	 * Converts a mount's ID list into a list containing the actual weapon item objects
	 * @param mount 
	 */
	private async buildMount(mount: any): Promise<object> {
		const mountData: any = {
			id: mount.id,
			weapons: []
		};

		const labels = {
			'aux': 'AUX MOUNT',
			'aux_aux': 'AUX/AUX MOUNT',
			'flex': 'FLEX MOUNT',
			'main': 'MAIN MOUNT',
			'main_aux': 'MAIN/AUX MOUNT',
			'heavy': 'HEAVY MOUNT',
			'integrated': 'INTEGRATED MOUNT',
		}

		const shortLabels = {
			'aux': 'AUX',
			'aux_aux': 'AUX/AUX',
			'flex': 'FLEX',
			'main': 'MAIN',
			'main_aux': 'MAIN/AUX',
			'heavy': 'HEAVY',
			'integrated': 'INT',
		};

		mountData.label = labels[mount.system.type] ?? 'NEW MOUNT';
		mountData.shortLabel = shortLabels[mount.system.type] ?? 'NEW';

		const weapons: any[] = [];
		const missing: any[] = [];

		for (const weaponId of mount.system.weapons) {
			const weapon = this.actor.items.get(weaponId);
			if (weapon) {
				this.mountedWeaponIds.push(weapon.id!);
				weapons.push(weapon);
			}
			else {
				// The weapon cannot be found; it was probably deleted.
				// We'll remove the missing values after this loop in order to not alter the
				// list while we're still iterating over it
				console.info(`Mount contains ID of a weapon that cannot be found. Queueing errant ID for removal: ${weaponId}`);
				missing.push(weaponId);
			}
		}

		if (missing.length > 0) {
			await mount.update({ 'system.weapons': mount.system.weapons.filter((w: any) => { return !missing.includes(w) }) });
			console.info(`Removed ${missing.length} errant IDs from mount data`);
		}

		// Sort weapons by size (desc), followed by name (asc)
		weapons.sort((a: any, b: any) => {
			const sizePriority = {
				'Superheavy': 1,
				'Heavy': 2,
				'Main': 3,
				'Auxiliary': 4,
			}

			const aSizePriority = sizePriority.hasOwnProperty(a.system.size) ? sizePriority[a.system.size] : 0;
			const bSizePriority = sizePriority.hasOwnProperty(b.system.size) ? sizePriority[b.system.size] : 0;

			let alpha = 0;

			if (a.name > b.name) {
				alpha = 1;
			}
			else if (a.name < b.name) {
				alpha = -1;
			}

			return 0
				|| Math.sign(aSizePriority - bSizePriority)
				|| alpha;
		});

		mountData.weapons = weapons;
		return mountData;
	}

	private _onDragWeaponCard(event: DragEvent): void {
		const htmlElement = event.currentTarget as HTMLElement ?? undefined;

		if (!htmlElement) {
			console.error('Unable to start drag operation on weapon card: error getting html element from event data');
			return;
		}

		event.dataTransfer?.setData('text/plain', $(htmlElement).data('itemId'));
	}

	private async _onDropWeaponCard(event: DragEvent): Promise<void> {
		const htmlElement = event.currentTarget as HTMLElement ?? undefined;
		if (!htmlElement) {
			console.error('Unable to process weapon drop operation: error getting html element from event data');
		}

		const mountId = $(htmlElement).data('itemId') ?? undefined;
		if (!mountId) {
			console.error('Unable to process weaon drop operation: destination mount has missing or invalid data-item-id attribute');
		}

		const weaponId = event.dataTransfer?.getData("text") ?? undefined;
		if (!weaponId) {
			console.error('Unable to process weapon drop operation: missing or invalid weapon id provided from drag event data');
			return;
		}

		const weapon = this.actor.items.get(weaponId);
		if (!weapon) {
			console.warn(`Unable to process weapon drop operation: unable to get weapon with ID ${weaponId} from actor item data. Does this actor own this item?`);
		}

		const mounts = this.actor.items.filter((i) => i.type === 'mount');
		mounts.forEach(async (m: any) => {
			if (m.id == mountId) {
				if (!m.system.weapons.includes(weaponId)) {
					m.system.weapons.push(weaponId);
					await m.update({ 'system.weapons': m.system.weapons });
				}
			}
			else {
				if (m.system.weapons.includes(weaponId)) {
					await m.update({ 'system.weapons': m.system.weapons.filter((w: any) => { return w != weaponId }) });
				}
			}
		});
	}

	private async rollStructure() {
		const actor: any = this.actor;
		const dieCount = actor.system.structure.max - actor.system.structure.value;

		if (dieCount < 1) {
			ui.notifications?.warn("This mech has taken no Structure damage. Skipping roll.");
			return;
		}

		let formula = `${dieCount}d6kl`;
		const r = new Roll(formula);
		await r.evaluate();
		const rollHtml = await r.render();

		let oneCount = 0;
		//@ts-expect-error
		r.terms[0].results.forEach((res) => {
			if (res.result == 1) {
				oneCount++;
			}
		});

		const data = {
			result: '',
			directHitResult: Math.min(actor.system.structure.value, 3),
			rolls: rollHtml,
		};

		if (oneCount > 1) {
			data.result = 'Crushing Hit';
		}
		else {
			switch (r.total) {
				case 6:
				case 5:
					data.result = 'Glancing Blow';
					break;
				case 4:
				case 3:
				case 2:
					data.result = 'System Trauma'
					break;
				case 1:
					data.result = 'Direct Hit'
					break;
			}
		}

		const messageContent = await renderTemplate("/systems/lancer-lite/template/chat/structure-roll.hbs", data);

		const messageData = {
			content: messageContent,
			sound: 'sounds/dice.wav'
		};

		CONFIG.ChatMessage.documentClass.create(messageData);
	}

	private async rollStress() {
		const actor: any = this.actor;
		const dieCount = actor.system.stress.max - actor.system.stress.value;

		if (dieCount < 1) {
			ui.notifications?.warn("This mech has taken no Stress damage. Skipping roll.");
			return;
		}

		let formula = `${dieCount}d6kl`;
		const r = new Roll(formula);
		await r.evaluate();
		const rollHtml = await r.render();

		let oneCount = 0;
		//@ts-expect-error
		r.terms[0].results.forEach((res) => {
			if (res.result == 1) {
				oneCount++;
			}
		});

		const data = {
			result: '',
			meltdownResult: Math.min(actor.system.stress.value, 3),
			rolls: rollHtml,
		};

		if (oneCount > 1) {
			data.result = 'Irreversible Meltdown';
		}
		else {
			switch (r.total) {
				case 6:
				case 5:
					data.result = 'Emergency Shunt';
					break;
				case 4:
				case 3:
				case 2:
					data.result = 'Destabilized Power Plant';
					break;
				case 1:
					data.result = 'Meltdown';
					break;
			}
		}

		const messageContent = await renderTemplate("/systems/lancer-lite/template/chat/stress-roll.hbs", data);

		const messageData = {
			content: messageContent,
			sound: 'sounds/dice.wav'
		};

		CONFIG.ChatMessage.documentClass.create(messageData);
	}

	private async fullRepair() {
		const actor: any = this.actor;

		await actor.update({
			// Restore Resources
			'system.hp.value': actor.system.hp.max,
			'system.stress.value': actor.system.stress.max,
			'system.structure.value': actor.system.structure.max,
			'system.cp.value': actor.system.cp.max,
			'system.repairs.value': 0,

			// Clear Conditions
			'system.conditions.exposed': false,
			'system.conditions.hidden': false,
			'system.conditions.immobilized': false,
			'system.conditions.impaired': false,
			'system.conditions.invisible': false,
			'system.conditions.jammed': false,
			'system.conditions.lock_on': false,
			'system.conditions.prone': false,
			'system.conditions.shredded': false,
			'system.conditions.slowed': false,
			'system.conditions.stunned': false
		});

		// Update Weapons & Systems; clear Destroyed and restore Limited
		actor.items.forEach(async (item: any) => {
			switch (item.type) {
				case 'weapon':
				case 'system':
					await item.update({
						'system.limited.value': item.system.limited.max,
						'system.destroyed': false
					});
					break;
			}
		});

		CONFIG.ChatMessage.documentClass.create({ content: `${this.actor.name} has been fully repaired!` });
	}
}