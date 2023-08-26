import RollDialog from "../dialog/roll-dialog/RollDialog";

export default class LancerActorSheet extends ActorSheet {

	/** @override */
	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		html.find('.item-edit').on('click', (ev) => {
			const item = this.actor.items.get($(ev.currentTarget).data('itemId'), { strict: true });
			item.sheet?.render(true);
		});

		html.find('.item-add').on('click', (ev) => {
			const itemName: string = $(ev.currentTarget).data('itemName') ?? 'Item';
			const itemType: string = $(ev.currentTarget).data('itemType');
			if (!itemType) {
				console.error('Unable to add new item: no item type specified by data-item-type attribute');
			}

			CONFIG.Item.documentClass.create({ type: itemType, name: itemName }, { parent: this.actor, renderSheet: true });
		});

		html.find('.weapon-roll').on('click', async (ev) => {
			/* // Keeping this test code as sample code for creating a chat message
			const chatData = {content: 'Opening Weapon Roll Dialog'};
			CONFIG.ChatMessage.documentClass.create(chatData);
			*/
			const weapon = this.actor.items.get($(ev.currentTarget).data('itemId'), { strict: true });
			const d = new RollDialog(weapon);
			d.render(true);
		});
	}
}