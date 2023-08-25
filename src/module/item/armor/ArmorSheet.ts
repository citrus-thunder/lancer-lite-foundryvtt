import styles from "./armor.module.scss";

export default class ArmorSheet extends ItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/armor.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		console.log(data);
		return data;
	};
}