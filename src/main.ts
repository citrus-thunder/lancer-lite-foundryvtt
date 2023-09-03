import LancerActor from "./module/sheet/actor/LancerActor";
import LancerItem from "./module/sheet/item/LancerItem";
import LancerChatMessage from "./module/chat/LancerChatMessage";

// Actor Sheets
import PilotSheet from "./module/sheet/actor/pilot/PilotSheet";
import MechSheet from "./module/sheet/actor/mech/MechSheet";
import NPCMechSheet from "./module/sheet/actor/mech/NPCMechSheet";

// Item Sheets
import ArmorSheet from "./module/sheet/item/armor/ArmorSheet";
import CoreBonusSheet from "./module/sheet/item/core-bonus/CoreBonusSheet";
import GearSheet from "./module/sheet/item/gear/GearSheet";
import LicenseSheet from "./module/sheet/item/license/LicenseSheet";
import MountSheet from "./module/sheet/item/mount/MountSheet";
import ReactionSheet from "./module/sheet/item/reaction/ReactionSheet";
import SystemSheet from "./module/sheet/item/system/SystemSheet";
import TalentSheet from "./module/sheet/item/talent/TalentSheet";
import TraitSheet from "./module/sheet/item/trait/TraitSheet";
import TriggerSheet from "./module/sheet/item/trigger/TriggerSheet";
import WeaponSheet from "./module/sheet/item/weapon/WeaponSheet";

// Helpers & Utilities
import helpers from "./module/helper/helpers";
import preloadTemplates from "./module/preloadTemplates";

import './lancer.scss';

const SYSTEM_NAME = 'lancer-lite';
//CONFIG.debug.hooks = true;

Hooks.once('init', async () => {
	game[SYSTEM_NAME] = { PilotSheet };

	// temp disabled: template is not not currently in use
	//CONFIG.ChatMessage.documentClass = LancerChatMessage;

	CONFIG.Actor.documentClass = LancerActor;
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet(SYSTEM_NAME, PilotSheet, {label: 'Pilot', types: ['pilot'], makeDefault: true});
	Actors.registerSheet(SYSTEM_NAME, MechSheet, {label: 'Mech', types: ['mech'], makeDefault: true});
	Actors.registerSheet(SYSTEM_NAME, NPCMechSheet, {label: 'NPC Mech', types: ['mech'], makeDefault: false});

	CONFIG.Item.documentClass = LancerItem;
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet(SYSTEM_NAME, ArmorSheet, {label: 'Armor', types: ['armor'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, CoreBonusSheet, {label: 'Core Bonus', types: ['core_bonus'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, GearSheet, {label: 'Gear', types: ['gear'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, LicenseSheet, {label: 'License', types: ['license'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, MountSheet, {label: 'Mount', types: ['mount'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, ReactionSheet, {label: 'Reaction', types: ['reaction'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, SystemSheet, {label: 'System', types: ['system'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TalentSheet, {label: 'Talent', types: ['talent'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TraitSheet, {label: 'Trait', types: ['trait'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, TriggerSheet, {label: 'Trigger', types: ['trigger'], makeDefault: true});
	Items.registerSheet(SYSTEM_NAME, WeaponSheet, {label: 'Weapon', types: ['weapon'], makeDefault: true});
	
	helpers.registerAll();
	await preloadTemplates(SYSTEM_NAME);
});

Hooks.on('renderChatMessage', async (app: any, html: any) => {
	html.find('.item-card .toggle-body').on('click', (ev) => {
		$(ev.currentTarget)
			.closest('.item-card')
			.find('.body .description')
			.slideToggle()
	});
});