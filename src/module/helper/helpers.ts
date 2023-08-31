import romanizeHelper from "./romanize";
import ifEqualsHelper from "./ifEquals";
import ifNotEqualsHelper from "./ifNotEquals";

const helpers = {
	registerAll: function () {
		Handlebars.registerHelper('romanize', romanizeHelper);
		Handlebars.registerHelper('ifEquals', ifEqualsHelper);
		Handlebars.registerHelper('ifNotEquals', ifNotEqualsHelper);
	}
}

export default helpers;