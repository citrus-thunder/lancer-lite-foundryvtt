import romanizeHelper from "./romanize";

const helpers = {
	registerAll: function () {
		Handlebars.registerHelper('romanize', romanizeHelper);
	}
}

export default helpers;