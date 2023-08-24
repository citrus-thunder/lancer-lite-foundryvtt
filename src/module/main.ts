import { preloadTemplates } from "./preloadTemplates";

import { PilotSheet } from "./actor/pilot/pilot-sheet";
import { MechSheet } from "./actor/mech/mech-sheet";

import { ArmorSheet } from "./item/armor/armor-sheet";
import { GearSheet } from "./item/gear/gear-sheet";
import { SystemSheet } from "./item/system/system-sheet";
import { TraitSheet } from "./item/trait/trait-sheet";
import { WeaponSheet } from "./item/weapon/weapon-sheet";

import triggerPartial from "./partial/triggerPartial";
import weaponPartial from "./partial/weaponPartial";

const SYSTEM_NAME = 'lancer-lite';
CONFIG.debug.hooks = true;

Handlebars.registerPartial('trigger', triggerPartial);
Handlebars.registerPartial('weapon', weaponPartial);

Hooks.once('ready', async () => {
	console.log('Init Hook');
	game[SYSTEM_NAME] = { PilotSheet };
	
	//CONFIG.Actor.documentClass = Pilot;
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet(SYSTEM_NAME, PilotSheet, {label: 'Pilot', types: ['pilot'], makeDefault: true});
	Actors.registerSheet(SYSTEM_NAME, MechSheet, {label: 'Mech', types: ['mech'], makeDefault: true});

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet(SYSTEM_NAME, ArmorSheet, {label: 'Armor', types: ['armor'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, GearSheet, {label: 'Gear', types: ['gear'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, SystemSheet, {label: 'System', types: ['system'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TraitSheet, {label: 'Trait', types: ['trait'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, WeaponSheet, {label: 'Weapon', types: ['weapon'], makeDefault: true});

	await preloadTemplates(SYSTEM_NAME);
});