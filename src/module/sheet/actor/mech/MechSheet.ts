import LancerActorSheet from '../LancerActorSheet';

export default class MechSheet extends LancerActorSheet {
	allowedItemTypes = [
	'weapon',
	'trait',
	'system',
	'mount'
	];

	constructor(data, options) {
		super(data, options);
	}

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["character", "sheet", "actor"],
		});
	}

	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/actor/mech/mech-sheet.hbs`;
	}
}