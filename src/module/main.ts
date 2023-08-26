import LancerActor from "./actor/LancerActor";
import LancerItem from "./item/LancerItem";
import LancerChatMessage from "./chat/LancerChatMessage";

// Actor Sheets
import PilotSheet from "./actor/pilot/PilotSheet";
import MechSheet from "./actor/mech/MechSheet";

// Item Sheets
import ArmorSheet from "./item/armor/ArmorSheet";
import CoreBonusSheet from "./item/core-bonus/CoreBonusSheet";
import GearSheet from "./item/gear/GearSheet";
import LicenseSheet from "./item/license/LicenseSheet";
import SystemSheet from "./item/system/SystemSheet";
import TalentSheet from "./item/talent/TalentSheet";
import TraitSheet from "./item/trait/TraitSheet";
import TriggerSheet from "./item/trigger/TriggerSheet";
import WeaponSheet from "./item/weapon/WeaponSheet";

// Helpers & Utilities
import partials from "./partial/partials";
import helpers from "./helper/helpers";
import preloadTemplates from "./preloadTemplates";

const SYSTEM_NAME = 'lancer-lite';
//CONFIG.debug.hooks = true;

partials.registerAll();
helpers.registerAll();

Hooks.once('init', async () => {
	game[SYSTEM_NAME] = { PilotSheet };

	CONFIG.ChatMessage.documentClass = LancerChatMessage;

	CONFIG.Actor.documentClass = LancerActor;
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet(SYSTEM_NAME, PilotSheet, {label: 'Pilot', types: ['pilot'], makeDefault: true});
	Actors.registerSheet(SYSTEM_NAME, MechSheet, {label: 'Mech', types: ['mech'], makeDefault: true});

	CONFIG.Item.documentClass = LancerItem;
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet(SYSTEM_NAME, ArmorSheet, {label: 'Armor', types: ['armor'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, CoreBonusSheet, {label: 'Core Bonus', types: ['core_bonus'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, GearSheet, {label: 'Gear', types: ['gear'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, LicenseSheet, {label: 'License', types: ['license'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, SystemSheet, {label: 'System', types: ['system'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TalentSheet, {label: 'Talent', types: ['talent'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TraitSheet, {label: 'Trait', types: ['trait'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TriggerSheet, {label: 'Trigger', types: ['trigger'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, WeaponSheet, {label: 'Weapon', types: ['weapon'], makeDefault: true});

	await preloadTemplates(SYSTEM_NAME);
});