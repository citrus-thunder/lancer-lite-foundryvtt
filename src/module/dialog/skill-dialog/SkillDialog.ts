export type SkillDialogInfo = {
	bonus: number,
	bonusSource: string
}

export default class SkillDialog extends Dialog {

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			height: 180
		});
	}

	constructor(info: SkillDialogInfo | null = null) {
		let data: any = {};
		let options: any = {};

		const rollSkill = async (html: JQuery<HTMLElement>) => {
			let accuracy = parseInt(html.find('#input-accuracy').val() as string);
			let difficulty = parseInt(html.find('#input-difficulty').val() as string);
			let flavor = 'Skill Check';
			let formula = `1d20`;

			if (info) {
				const operator = info.bonus >= 0 ? '+' : '-';
				flavor += ` | ${operator}${info.bonus} ${info.bonusSource}`;
				formula += ` ${operator} ${info.bonus}`;
			}

			if (accuracy > 0) {
				flavor += ` | Accuracy ${accuracy}`;
			}

			if (difficulty > 0) {
				flavor += ` | Difficulty ${difficulty}`;
			}

			let accdiff = accuracy - difficulty;

			if (accdiff > 0) {
				formula += ` + ${accdiff}d6kh`
			}

			if (accdiff < 0) {
				formula += ` - ${accdiff * -1}d6kh`
			}

			const r = new Roll(formula);
			let m: any = await r.toMessage({ content: '' }, { create: false });
			m.flavor = flavor;
			CONFIG.ChatMessage.documentClass.create(m);
		};

		data = {
			title: 'Skill Check',
			content: '',
			buttons: {
				roll: {
					icon: '<i class="fas fa-dice-d20"></i>',
					label: "Roll Skill",
					callback: rollSkill
				}
			},
			default: 'roll',
		};

		super(data, options);
	}

	protected override async _injectHTML(html: JQuery<HTMLElement>): Promise<void> {
		super._injectHTML(html);

		const data = {};
		const content = await renderTemplate('systems/lancer-lite/template/dialog/skill-dialog.hbs', data);

		$(html.find('.dialog-content')[0]).html(content);
	}
}