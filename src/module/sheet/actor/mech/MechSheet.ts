import LancerItem from '../../item/LancerItem';
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

		mountData.label = labels[mount.system.type] ?? 'NEW MOUNT';

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
		weapons.sort((a: any, b:any) => {
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
					await m.update({ 'system.weapons': m.system.weapons});
				}
			}
			else {
				if (m.system.weapons.includes(weaponId)) {
					await m.update({ 'system.weapons': m.system.weapons.filter((w: any) => { return w != weaponId }) });
				}
			}
		});
	}
}