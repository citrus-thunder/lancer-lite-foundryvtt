interface StatusEffect {
	_id?: string | null | undefined,
	id: string,
	name: string,
	changes?: any | null | undefined,
	disabled?: boolean | null | undefined,
	duration?: any | null | undefined,
	icon?: string | null | undefined,
	label?: string | null | undefined,
	origin?: string | null | undefined;
	tint?: string | null | undefined;
	transfer?: boolean | null | undefined;
	flags?: any | null | undefined;
}

export const statusEffects: StatusEffect[] = [
	{
		icon: 'icons/svg/aura.svg',
		id: 'bolstered',
		name: 'Bolstered',
		label: 'lancer-lite.bolstered',
		changes: [
			{
			key: 'system.conditions.bolstered',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
	{
		icon: 'systems/lancer-lite/assets/icons/broken-shield.svg',
		id: 'exposed',
		name: 'Exposed',
		label: 'lancer-lite.exposed',
		changes: [
			{
			key: 'system.conditions.exposed',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
	{
		icon: 'icons/svg/cowled.svg',
		id: 'hidden',
		name: 'Hidden',
		label: 'lancer-lite.hidden',
		changes: [
			{
			key: 'system.conditions.hidden',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
	{
		icon: 'icons/svg/trap.svg',
		id: 'immobilized',
		name: 'Immobilized',
		label: 'lancer-lite.immobilized',
	},
	{
		icon: 'systems/lancer-lite/assets/icons/broken-arrow.svg',
		id: 'impaired',
		name: 'Impaired',
		label: 'lancer-lite.impaired',
	},
	{
		icon: 'icons/svg/invisible.svg',
		id: 'invisible',
		name: 'Invisible',
		label: 'lancer-lite.invisible',
		changes: [
			{
			key: 'system.conditions.invisible',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
	{
		icon: 'systems/lancer-lite/assets/icons/aerial-signal.svg',
		id: 'jammed',
		name: 'Jammed',
		label: 'lancer-lite.jammed',
	},
	{
		icon: 'systems/lancer-lite/assets/icons/crosshair.svg',
		id: 'lock_on',
		name: 'Lock On',
		label: 'lancer-lite.lock_on',
		changes: [
			{
			key: 'system.conditions.lock_on',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
	{
		icon: 'systems/lancer-lite/assets/icons/fall-down.svg',
		id: 'prone',
		name: 'Prone',
		label: 'lancer-lite.prone',
	},
	{
		icon: 'systems/lancer-lite/assets/icons/shield-disabled.svg',
		id: 'shredded',
		name: 'Shredded',
		label: 'lancer-lite.shredded',
	},
	{
		icon: 'icons/svg/frozen.svg',
		id: 'slowed',
		name: 'Slowed',
		label: 'lancer-lite.slowed',
		changes: [
			{
			key: 'system.conditions.slowed',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
	{
		icon: 'icons/svg/daze.svg',
		id: 'stunned',
		name: 'Stunned',
		label: 'lancer-lite.stunned',
		changes: [
			{
			key: 'system.conditions.stunned',
			mode: foundry.CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
			value: 'true',
			}
		]
	},
];