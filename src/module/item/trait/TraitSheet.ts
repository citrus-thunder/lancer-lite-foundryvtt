import styles from "./trait.module.scss";

export default class TraitSheet extends ItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/trait.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		console.log(data);
		return data;
	};
}