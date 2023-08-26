import type LancerItem from "../../item/LancerItem";
import styles from './roll-dialog.module.scss';

export default class RollDialog extends Dialog {

	weapon: LancerItem;

	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {

		});
	}

	constructor(weapon: LancerItem) {
		let data: any = {};
		let options: any = {};

		const rollAttack = (html) => {
			let actor = weapon.parent;
			console.log(actor);
		};

		const rollDamage = async (html) => {
			debugger;
			let x = weapon;
			console.log(x);
			const r = new Roll('2d6');
			await r.toMessage();
		};

		data = {
			title: "Roll Weapon",
			content: '',
			buttons: {
				attack: {
					icon: '<i class="fas fa-dice-d20"></i>',
					label: "Roll Attack",
					callback: rollAttack
				},
				damage: {
					icon: '<i class="fas fa-dice-d20"></i>',
					label: "Roll Damage",
					callback: rollDamage,
				}
			},
			default: "attack",
		};

		super(data, options);
		this.weapon = weapon;
	}

	protected override async _injectHTML(html: JQuery<HTMLElement>): Promise<void> {
		super._injectHTML(html);
		const data =  {
			weapon: this.weapon,
			styles: styles
		};
		const content = await renderTemplate('systems/lancer-lite/templates/dialog/roll-dialog.hbs', data);
		$(html.find('.dialog-content')[0]).html(content);
	}
}