export default async function preloadTemplates(system) {
	const templatePaths = [
		`systems/${system}/templates/actor/pilot-sheet.hbs`,
		`systems/${system}/templates/actor/mech-sheet.hbs`,
	];

	return loadTemplates(templatePaths);
}