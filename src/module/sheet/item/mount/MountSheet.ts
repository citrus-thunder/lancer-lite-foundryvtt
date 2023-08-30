import LancerItemSheet from "../LancerItemSheet";

export default class MountSheet
	extends LancerItemSheet {
	constructor(data, options) {
		super(data, options);
	}

	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/item/mount-sheet.hbs`;
	}

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			height: 250,
		});
	}
}