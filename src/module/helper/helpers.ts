import romanizeHelper from "./romanize";
import ifEqualsHelper from "./ifEquals";

const helpers = {
	registerAll: function () {
		Handlebars.registerHelper('romanize', romanizeHelper);
		Handlebars.registerHelper('ifEquals', ifEqualsHelper);
	}
}

export default helpers;