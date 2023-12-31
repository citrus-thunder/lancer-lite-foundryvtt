export default async function preloadTemplates(system) {
	const templatePaths = [
		// Pilot Sheet Tabs
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-traits-tab.hbs`,
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-licenses-tab.hbs`,
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-loadout-tab.hbs`,
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-about-tab.hbs`,

		// Mech Sheet Tabs
		`systems/${system}/template/sheet/actor/mech/tab/mech-stats-tab.hbs`,
		`systems/${system}/template/sheet/actor/mech/tab/mech-loadout-tab.hbs`,
		`systems/${system}/template/sheet/actor/mech/tab/mech-gear-tab.hbs`,
		`systems/${system}/template/sheet/actor/mech/tab/mech-about-tab.hbs`,

		// Mech Sheet Partials
		`systems/${system}/template/sheet/actor/mech/partial/mount-label.hbs`,

		// Item Cards
		`systems/${system}/template/card/armor-card.hbs`,
		`systems/${system}/template/card/core-bonus-card.hbs`,
		`systems/${system}/template/card/gear-card.hbs`,
		`systems/${system}/template/card/license-card.hbs`,
		`systems/${system}/template/card/mount-card.hbs`,
		`systems/${system}/template/card/reaction-card.hbs`,
		`systems/${system}/template/card/system-card.hbs`,
		`systems/${system}/template/card/talent-card.hbs`,
		`systems/${system}/template/card/trait-card.hbs`,
		`systems/${system}/template/card/trigger-card.hbs`,
		`systems/${system}/template/card/weapon-card.hbs`,
	];

	return loadTemplates(templatePaths);
}