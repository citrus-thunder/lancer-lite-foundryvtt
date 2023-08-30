const ifEquals: Handlebars.HelperDelegate = function(arg1, arg2, options) {
	//@ts-expect-error
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}

export default ifEquals;