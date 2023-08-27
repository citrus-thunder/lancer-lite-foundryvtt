import LancerItemSheet from "../LancerItemSheet";

export default class TraitSheet extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}
	
	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/trait-sheet.hbs`;
	}
}