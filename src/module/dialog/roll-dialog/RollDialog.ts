import dialogTemplate from "./rollDialogTemplate";

import type LancerItem from "../../item/LancerItem";

export default class RollDialog extends Dialog {

	weapon: LancerItem;

	constructor(weapon: LancerItem) {
		let data: any = {};
		let options: any = {};

		const template = Handlebars.compile(dialogTemplate);

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
			content: template(weapon),
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
}