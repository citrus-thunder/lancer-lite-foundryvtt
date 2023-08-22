import styles from './pilot.module.scss';

export class PilotSheet extends ActorSheet {

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
  	return `systems/lancer-lite/templates/actor/pilot.hbs`;
  }

	getData() {
		const data: any = super.getData();
		data.styles = styles;
		return data;
	}
}