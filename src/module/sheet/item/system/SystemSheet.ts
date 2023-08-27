import LancerItemSheet from "../LancerItemSheet";

export default class SystemSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/system-sheet.hbs`;
	}
}