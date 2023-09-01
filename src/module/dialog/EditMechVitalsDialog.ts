import type LancerActor from '../sheet/actor/LancerActor';

export default class EditMechVitalsDialog extends Dialog {
	mech: LancerActor;

	/**@override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			height: 150
		});
	}

	constructor(mech: LancerActor) {
		let data: any = {};
		let options: any = {};

		const updateMechVitals = async (html: JQuery<HTMLElement>) => {
			const stressCap = html.find('#input-stress-cap').first().val() ?? 0;
			const structureCap = html.find('#input-structure-cap').first().val() ?? 0;
			
			const update = {
				'system.stress.max': stressCap,
				'system.structure.max': structureCap
			}

			mech.update(update);
		};

		data = {
			title: "Update Mech Vitals",
			buttons: {
				save: {
					icon: '<i class="fas fa-floppy-disk"></i>',
					label: "Update Vitals",
					callback: updateMechVitals
				}
			}
		}

		super(data, options);
		this.mech = mech;
	}

	protected override async _injectHTML(html: JQuery<HTMLElement>) {
		super._injectHTML(html);
		const data = {
			mech: this.mech
		}

		const content = await renderTemplate('/systems/lancer-lite/template/dialog/mech-vitals-dialog.hbs', data);
		$(html.find('.dialog-content')[0]).html(content);
	}
}