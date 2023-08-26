import LancerItemSheet from "../LancerItemSheet";

import styles from "./weapon-sheet.module.scss";

export default class WeaponSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/weapon-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	}
}