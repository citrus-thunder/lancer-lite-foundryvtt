import styles from "./core-bonus.module.scss"

export default class CoreBonusSheet extends ItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/core_bonus.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		console.log(data);
		return data;
	};
}