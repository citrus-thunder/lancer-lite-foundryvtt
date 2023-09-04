import EditMechVitalsDialog from '../../dialog/EditMechVitalsDialog';
import LancerActorSheet from "./LancerActorSheet";

export default class MechSheet extends LancerActorSheet {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["character", "sheet", "actor"],
			width: 675,
			height: 725,
		});
	}

	/** @override */
	activateListeners(html: JQuery<HTMLElement>): void {
		super.activateListeners(html);

		html.find('.edit-vitals').on('click', async (ev) => {
			new EditMechVitalsDialog(this.actor).render(true);
		});

		html.find('.roll-structure').on('click', this.rollStructure.bind(this));
		html.find('.roll-stress').on('click', this.rollStress.bind(this));
	}

	private async rollStructure() {
		const actor: any = this.actor;
		const dieCount = actor.system.structure.max - actor.system.structure.value;

		if (dieCount < 1) {
			ui.notifications?.warn("This mech has taken no Structure damage. Skipping roll.");
			return;
		}

		let formula = `${dieCount}d6kl`;
		const r = new Roll(formula);
		await r.evaluate();
		const rollHtml = await r.render();

		let oneCount = 0;
		//@ts-expect-error
		r.terms[0].results.forEach((res) => {
			if (res.result == 1) {
				oneCount++;
			}
		});

		const data = {
			result: '',
			directHitResult: Math.min(actor.system.structure.value, 3),
			rolls: rollHtml,
		};

		if (oneCount > 1) {
			data.result = 'Crushing Hit';
		}
		else {
			switch (r.total) {
				case 6:
				case 5:
					data.result = 'Glancing Blow';
					break;
				case 4:
				case 3:
				case 2:
					data.result = 'System Trauma'
					break;
				case 1:
					data.result = 'Direct Hit'
					break;
			}
		}

		const messageContent = await renderTemplate("/systems/lancer-lite/template/chat/structure-roll.hbs", data);

		const messageData = {
			content: messageContent,
			sound: 'sounds/dice.wav'
		};

		CONFIG.ChatMessage.documentClass.create(messageData);
	}

	private async rollStress() {
		const actor: any = this.actor;
		const dieCount = actor.system.stress.max - actor.system.stress.value;

		if (dieCount < 1) {
			ui.notifications?.warn("This mech has taken no Stress damage. Skipping roll.");
			return;
		}

		let formula = `${dieCount}d6kl`;
		const r = new Roll(formula);
		await r.evaluate();
		const rollHtml = await r.render();

		let oneCount = 0;
		//@ts-expect-error
		r.terms[0].results.forEach((res) => {
			if (res.result == 1) {
				oneCount++;
			}
		});

		const data = {
			result: '',
			meltdownResult: Math.min(actor.system.stress.value, 3),
			rolls: rollHtml,
		};

		if (oneCount > 1) {
			data.result = 'Irreversible Meltdown';
		}
		else {
			switch (r.total) {
				case 6:
				case 5:
					data.result = 'Emergency Shunt';
					break;
				case 4:
				case 3:
				case 2:
					data.result = 'Destabilized Power Plant';
					break;
				case 1:
					data.result = 'Meltdown';
					break;
			}
		}

		const messageContent = await renderTemplate("/systems/lancer-lite/template/chat/stress-roll.hbs", data);

		const messageData = {
			content: messageContent,
			sound: 'sounds/dice.wav'
		};

		CONFIG.ChatMessage.documentClass.create(messageData);
	}
}