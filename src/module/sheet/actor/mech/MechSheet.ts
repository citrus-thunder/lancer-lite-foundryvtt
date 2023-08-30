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
			dropSelector: ".weapon-card-drop",
			//@ts-expect-error
			permissions: {dragstart: this._canDragStart.bind(this), drop: this._canDragDrop.bind(this)},
			callbacks: {dragstart: this._onDragStart.bind(this), drop: this._onDrop.bind(this)} // todo: replace these methods with our own specialized ones
		});

		//dragDrop.bind(html[0]); // temp disable
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
			debugger;
			const weapon = this.actor.items.get(weaponId);
			if (weapon) {
				debugger;
				this.mountedWeaponIds.push(weapon.id!);
				weapons.push(weapon);
			}
			else {
				// We'll remove the missing values later in order to not alter the
				// list while we're still iterating over it
				console.warn(`Mount contains ID of a weapon that cannot be found. Queueing errant ID for removal: ${weaponId}`);
				missing.push(weaponId);
			}
		}

		if (missing.length > 0) {
			await mount.update({ 'system.weapons': mount.system.weapons.filter((w: any) => { !missing.includes(w.id) }) });
			console.info(`Removed ${missing.length} errant IDs from mount data`);
		}

		mountData.weapons = weapons;
		return mountData;
	}

	protected override _onDrop(event: DragEvent): void {
		super._onDrop(event);

		console.log(event);
	}
}