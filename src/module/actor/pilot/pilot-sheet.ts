import styles from './pilot.module.scss';

export class PilotSheet extends ActorSheet {
	allowedItemTypes = [
		'weapon',
		'armor',
		'gear',
		// trigger?
		// talent?
		// licenses?
		// core bonuses?
	];

	constructor(data: any, options: any) {
		super(data, options);
	}

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["character", "sheet", "actor"],
		});
	}

	getData(): any {
		const data: any = super.getData();
		data.styles = styles;

		data.weapons = [];
		data.gear = [];
		// todo: multiple armors aren't really a thing in this system.
		data.armor = [];
		data.traits = [];

		this.actor.items.forEach((i) => {
			switch (i.type) {
				case 'weapon':
					data.weapons.push(i);
					break;
				case 'gear':
					data.gear.push(i);
					break;
				case 'trait':
					data.traits.push(i);
					break;
				case 'armor':
					data.armor.push(i);
					data
					break;
			}
		});

		// todo: sort?

		return data;
	}

	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		html.find('.weapon-edit').on('click', (ev) => {
			const weapon = this.actor.items.get($(ev.currentTarget).data('itemId'), {strict: true});
			weapon.sheet?.render(true);
		});

		/*
		// Maybe we should just have delete on the edit sheet?
		html.find('.weapon-delete').on('click', (ev) => {
			const weapon = this.actor.items.get($(ev.currentTarget).data('itemId'), {strict: true});
			weapon.delete();
		});
		*/
	}

	/** @override */
	get template() {
		return `systems/lancer-lite/templates/actor/pilot.hbs`;
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