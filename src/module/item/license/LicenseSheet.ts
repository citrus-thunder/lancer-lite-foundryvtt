import LancerItemSheet from "../LancerItemSheet";

import styles from "./license-sheet.module.scss";

export default class LicenseSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/templates/item/license-sheet.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	};
}