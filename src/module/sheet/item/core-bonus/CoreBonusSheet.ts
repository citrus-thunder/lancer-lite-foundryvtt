import LancerItemSheet from "../LancerItemSheet";

import styles from "./core-bonus-sheet.module.scss"

export default class CoreBonusSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/core-bonus-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	};
}