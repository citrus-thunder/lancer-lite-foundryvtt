export async function preloadTemplates(system) {
	const templatePaths = [
		`systems/${system}/templates/actor/pilot.hbs`,
		`systems/${system}/templates/actor/mech.hbs`,
	];

	return loadTemplates(templatePaths);
}