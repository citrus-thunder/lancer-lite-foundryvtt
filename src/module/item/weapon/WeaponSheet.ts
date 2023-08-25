import styles from "./weapon.module.scss";

export default class WeaponSheet extends ItemSheet {
	constructor(data, options) {
		super(data, options);
	}

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			width: 600,
			height: 600,
		});
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/weapon.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		console.log(data);
		return data;
	}

	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		html.find('.weapon-delete').on('click', (ev) => {
			this.item.delete();
		});
	}
}