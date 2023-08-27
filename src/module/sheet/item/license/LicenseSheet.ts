import LancerItemSheet from "../LancerItemSheet";

export default class LicenseSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/license-sheet.hbs`;
	}
}