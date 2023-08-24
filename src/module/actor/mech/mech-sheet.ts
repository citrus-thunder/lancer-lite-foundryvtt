import styles from './mech.module.scss';

export class MechSheet extends ActorSheet {
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