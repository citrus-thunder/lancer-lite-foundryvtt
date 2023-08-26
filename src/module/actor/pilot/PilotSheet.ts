import LancerActorSheet from '../LancerActorSheet';

import styles from './pilot-sheet.module.scss';

export default class PilotSheet extends LancerActorSheet {
	allowedItemTypes = [
		'armor',
		'core_bonus',
		'gear',
		'license',
		'talent',
		'trigger',
		'weapon',
	];

	constructor(data: any, options: any) {
		super(data, options);
	}

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["character", "sheet", "actor"],
			width: 675,
			height: 700,
		});
	}

	/** @override */
	get template() {
		return `systems/lancer-lite/templates/actor/pilot-sheet.hbs`;
	}

	getData(): any {
		const data: any = super.getData();
		data.styles = styles;

		// todo: multiple armors aren't really a thing in this system.
		data.armor = [];
		data.core_bonuses = [];
		data.gear = [];
		data.licenses = [];
		data.talents = [];
		data.triggers = [];
		data.weapons = [];

		this.actor.items.forEach((i) => {
			switch (i.type) {
				case 'armor':
					data.armor.push(i);
					break;
				case 'core_bonus':
					data.core_bonuses.push(i);
					break;
				case 'gear':
					data.gear.push(i);
					break;
				case 'license':
					data.licenses.push(i);
					break;
				case 'talent':
					data.talents.push(i);
					break;
				case 'trigger':
					data.triggers.push(i);
					break;
				case 'weapon':
					data.weapons.push(i);
					break;
			}
		});

		// todo: sort?
		// sort licenses by name then level
		data.licenses.sort((a: any, b: any) => {
			const aVal = a.name + a.system.level;
			const bVal = b.name + b.system.level;
			
			if (aVal > bVal) {
				return 1
			}
			else if (aVal < bVal) {
				return -1
			}
			else
				{
				return 0;
				}
		});

		return data;
	}

	protected override async _onDropItem(event: DragEvent, data: ActorSheet.DropData.Item): Promise<unknown> {
		if (!this.actor.isOwner) {
			return false;
		}

		const item = await Item.bind(this).fromDropData(data);
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
}