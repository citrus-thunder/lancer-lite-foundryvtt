import LancerItemSheet from "../LancerItemSheet";

import styles from "./trigger-sheet.module.scss";

export default class TriggerSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/trigger-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	};
}