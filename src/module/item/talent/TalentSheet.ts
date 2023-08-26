import LancerItemSheet from "../LancerItemSheet";

import styles from "./talent-sheet.module.scss";

export default class TalentSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/talent-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	};
}