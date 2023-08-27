export default async function preloadTemplates(system) {
	const templatePaths = [
		// Pilot Sheet Tabs
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-traits-tab.hbs`,
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-licenses-tab.hbs`,
		`systems/${system}/template/sheet/actor/pilot/tab/pilot-loadout-tab.hbs`,
		
		// Card Partials
		`systems/${system}/template/card/armor-card.hbs`,
		`systems/${system}/template/card/core-bonus-card.hbs`,
		`systems/${system}/template/card/gear-card.hbs`,
		`systems/${system}/template/card/license-card.hbs`,
		`systems/${system}/template/card/talent-card.hbs`,
		`systems/${system}/template/card/trigger-card.hbs`,
		`systems/${system}/template/card/weapon-card.hbs`,
	];

	return loadTemplates(templatePaths);
}