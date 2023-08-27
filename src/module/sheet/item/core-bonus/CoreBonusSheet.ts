import LancerItemSheet from "../LancerItemSheet";

export default class CoreBonusSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/core-bonus-sheet.hbs`;
	}
}