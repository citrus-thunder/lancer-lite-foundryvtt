import MechSheet from "../MechSheet";

export default class NPCMechSheet extends MechSheet {
	allowedItemTypes = [
		'reaction',
		'system',
		'trait',
		'weapon',
	];

	constructor(data, options) {
		super(data, options);
	}

	get template() {
		return `systems/lancer-lite/template/sheet/actor/mech/npc-mech-sheet.hbs`;
	}

	/** @override */
	override async getData() {
		const data: any = super.getData();
		const actor: any = this.actor;

		data.action_systems = [];
		data.core_systems = [];
		data.passive_systems = [];
		data.protocols = [];
		data.reactions = [];
		data.tech_systems = [];
		data.traits = [];
		data.weapons = [];

		await actor.items.forEach(async (i: any) => {
			switch (i.type) {
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

		// sort
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
		data.reactions.sort(sortByName);
		data.tech_systems.sort(sortByName);
		data.traits.sort(sortByName);
		data.weapons.sort(sortByName);

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
			ui.notifications?.error('NPC Mechs cannot use this item!');
			console.log("Preventing addition of new item: Invalid item type for this actor type! " + '(' + this.actor.type + '/' + item.type + ')');
			event.preventDefault();
			return;
		}

		if (this.actor.uuid === item.parent?.uuid) {
			return this._onSortItem(event, item.toObject()) as Promise<Item[]>;
		}

		return super._onDropItem(event, data);
	}
}