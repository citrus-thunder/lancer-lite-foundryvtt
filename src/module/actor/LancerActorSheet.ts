import SkillDialog from "../dialog/skill-dialog/SkillDialog";
import WeaponDialog from "../dialog/weapon-dialog/WeaponDialog";

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
			const weapon = this.actor.items.get($(ev.currentTarget).data('itemId'), { strict: true });
			const d = new WeaponDialog(weapon);
			d.render(true);
		});
	}
}