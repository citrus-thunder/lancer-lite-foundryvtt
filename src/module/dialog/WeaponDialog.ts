import type LancerItem from '../sheet/item/LancerItem';

export default class WeaponDialog extends Dialog {

	weapon: LancerItem;

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			height: 180
		});
	}

	constructor(weapon: LancerItem) {
		let data: any = {};
		let options: any = {};

		data = {
			title: "Roll Weapon",
			content: '',
			buttons: {
				attack: {
					icon: '<i class="fas fa-dice-d20"></i>',
					label: "Roll Attack",
					callback: async (html) => { this.rollAttack(html, weapon) }
				},
				damage: {
					icon: '<i class="fas fa-dice-d20"></i>',
					label: "Roll Damage",
					callback: async () => { this.rollDamage(weapon) },
				},
				crit: {
					icon: '<i class="fas fa-dice-d20"></i>',
					label: "Roll Crit",
					callback: async () => { this.rollDamage(weapon, true) },
				}
			},
			default: "attack",
		};

		super(data, options);
		this.weapon = weapon;
	}

	protected override async _injectHTML(html: JQuery<HTMLElement>): Promise<void> {
		super._injectHTML(html);

		let accuracy = 0;
		let difficulty = 0;

		const w: any = this.weapon;

		// todo: this should eventually be moved to a more appropriate function
		const tags = w.system?.tags ?? false;
		if (tags) {
			const accMatch = tags.match(/[Aa]ccurate$|[Aa]ccurate(?:\s)*(?=,)/);
			if (accMatch) {
				accuracy++;
			}

			const diffMatch = tags.match(/[Ii]naccurate$|[Ii]naccurate(?:\s)*(?=,)/);
			if (diffMatch) {
				difficulty++;
			}
		}

		const data = {
			weapon: this.weapon,
			actor: this.weapon.parent,
			accuracy: accuracy,
			difficulty: difficulty
		};

		const content = await renderTemplate('systems/lancer-lite/template/dialog/weapon-dialog.hbs', data);
		$(html.find('.dialog-content')[0]).html(content);
	}

	private async rollAttack(html: JQuery<HTMLElement>, weapon) {
		let actor: any = weapon.parent;
		let accuracy = parseInt(html.find('#input-accuracy').val() as string);
		let difficulty = parseInt(html.find('#input-difficulty').val() as string);

		let bonus = ['mech', 'npc_mech'].includes(actor.type) ? actor.system.stats.attack : actor.system.stats.grit;
		let bonusLabel = actor.type == 'pilot' ? 'Grit' : 'Attack Bonus';

		let flavor = `Attack Roll | ${bonusLabel} ${bonus}`;
		let formula = `1d20 + ${bonus}`;

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
		const m: any = await r.toMessage({ content: '' }, { create: false });
		m.flavor = flavor;

		CONFIG.ChatMessage.documentClass.create(m);
	}

	private async rollDamage(weapon, crit = false) {
		let w: any = weapon;

		let flavor = `${w.name} Damage`;
		if (crit) {
			flavor += ' (CRIT)';
		}
		let formula = w.system.roll_formula;

		if (!formula) {
			console.error("Error rolling weapon damage: No roll formula provided");
		}

		// Only need to parse crit if formula includes a roll
		if (crit && formula.includes('d')) {
			const critMatch = formula.match(/(?<formula>(?<count>\d+)d(?<size>\d+))(?<remainder>[\s\S]*)/);
			formula = `${critMatch.groups.count * 2}d${critMatch.groups.size}kh${critMatch.groups.count}${critMatch.groups.remainder ?? ''}`;
		}

		const tags = w.system?.tags ?? false;
		if (tags) {
			const match = tags.match(/[rR]eliable[\s]*(?<val>[\d]*)/)
			if (match?.groups?.val) {
				flavor += ` | Reliable ${match?.groups.val}`;
				formula = `{${formula}, ${match.groups.val}}kh`;
			}
		}

		const r = new Roll(formula);
		let m: any = await r.toMessage({ content: '' }, { create: false });
		m.flavor = flavor;
		CONFIG.ChatMessage.documentClass.create(m);
	}
}