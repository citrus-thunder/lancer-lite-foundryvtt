import SkillDialog from "../../dialog/skill-dialog/SkillDialog";
import WeaponDialog from "../../dialog/weapon-dialog/WeaponDialog";

export default class LancerActorSheet extends ActorSheet {

	/** @override */
	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		// We provide an empty callback to simply suppress a "callback is not a function" error in the console
		const tabs = new Tabs({navSelector: ".tabs", contentSelector: ".content", initial: "traits", callback: () => {}});
		tabs.bind(html.get(0)!);

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