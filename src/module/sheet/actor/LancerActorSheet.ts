import SkillDialog from "../../dialog/skill-dialog/SkillDialog";
import WeaponDialog from "../../dialog/weapon-dialog/WeaponDialog";

export default class LancerActorSheet extends ActorSheet {

	/** @override */
	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		html.find('.item-edit').on('click', (ev) => {
			const item = this.actor.items.get($(ev.currentTarget).data('itemId'), { strict: true });
			item.sheet?.render(true);
		});

		html.find('.item-add').on('click', (ev) => {
			const $element = $(ev.currentTarget);
			const itemName: string = $element.data('itemName') ?? 'Item';
			const itemType: string = $element.data('itemType');

			if (!itemType) {
				console.error('Unable to add new item: no item type specified by data-item-type attribute');
			}

			let itemData = { type: itemType, name: itemName, system: {} };
			
			const $defaultDataFields = $element.find('input[type=hidden][name^="default."]');
			$defaultDataFields.each((index, element) => {
				let fieldData: object = {};
				let fieldName: string = $(element).attr('name') ?? 'DEFAULT_ERR';
				let fieldValue: any = $(element).val();

				let itemFieldName = fieldName.split('.')[1] ?? undefined;

				if (itemFieldName === undefined) {
					console.error('Unable to populate default field info: invalid default input name');
					return;
				}

				fieldData[itemFieldName] = fieldValue;
				itemData.system = mergeObject(itemData.system, fieldData);
			});

			CONFIG.Item.documentClass.create(itemData, { parent: this.actor, renderSheet: true });
		});

		html.find('.weapon-roll').on('click', async (ev) => {
			const weapon = this.actor.items.get($(ev.currentTarget).data('itemId'), { strict: true });
			const d = new WeaponDialog(weapon);
			d.render(true);
		});

		html.find('.skill-check').on('click', async (ev) => {
			new SkillDialog().render(true);
		});

		html.find('.stat-roll').on('click', async (ev) => {
			const statName: string = $(ev.currentTarget).data('stat') ?? '';
			const statLabel: string = $(ev.currentTarget).data('statLabel') ?? '';

			const a: any = this.actor;
			const stat: number = a.system[statName];
			new SkillDialog({ bonus: stat, bonusSource: statLabel }).render(true);
		});

		html.find('.item-card .toggle-body').on('click', (ev) => {
			$(ev.currentTarget).closest('.item-card').find('.body .description').slideToggle();
		});
	}
}