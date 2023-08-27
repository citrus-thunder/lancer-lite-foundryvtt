export default class LancerItemSheet extends ItemSheet {

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			width: 600,
			height: 600,
		});
	}

	constructor(data, options) {
		super(data, options);
	}

	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);
		html.find('.item-delete').on('click', (ev) => {
			this.item.delete();
		});
	}
}