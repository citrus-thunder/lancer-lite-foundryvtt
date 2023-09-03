import MechSheet from "./MechSheet";

export default class NPCMechSheet extends MechSheet {
	constructor (data, options) {
		super(data, options);
	}

	get template() {
		return `systems/lancer-lite/template/sheet/actor/mech/npc-mech-sheet.hbs`;
	}
}