import LancerItemSheet from "../LancerItemSheet";

import styles from "./system-sheet.module.scss";

export default class SystemSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/system-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	};
}