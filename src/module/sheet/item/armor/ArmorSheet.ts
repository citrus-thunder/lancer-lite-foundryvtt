import LancerItemSheet from "../LancerItemSheet";

import styles from "./armor-sheet.module.scss";

export default class ArmorSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/armor-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	};
}