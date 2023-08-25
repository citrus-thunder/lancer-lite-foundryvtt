import styles from "./gear.module.scss";

export default class GearSheet extends ItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/gear.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		console.log(data);
		return data;
	};
}