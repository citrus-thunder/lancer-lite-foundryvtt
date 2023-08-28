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
			width: 675,
			height: 725,
			tabs: [
				{
					group: 'primary',
					navSelector: '.tabs', 
					contentSelector: '.content', 
					initial: 'traits'
				}
			],
		});
	}


	/** @override */
	get template() {
		return `systems/lancer-lite/template/sheet/actor/mech/mech-sheet.hbs`;
	}
}