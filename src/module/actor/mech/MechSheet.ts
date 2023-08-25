import styles from './mech-sheet.module.scss';

export default class MechSheet extends ActorSheet {
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
		return `systems/lancer-lite/templates/actor/mech.hbs`;
	}

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	}
}