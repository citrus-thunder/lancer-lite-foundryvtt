// from https://www.w3resource.com/javascript-exercises/javascript-math-exercise-21.php
const romanize = (num) => {
	if (isNaN(num)) {
		return NaN;
	}
	let digits: any = String(+num).split("");
	let key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
		"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
		"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
	let roman = "";
	let i = 3;
	while (i--) {
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	}
	return Array(+digits.join("") + 1).join("M") + roman;
}

const romanizeHelper: HandlebarsTemplateDelegate = (context: any, options?: Handlebars.RuntimeOptions | undefined): string => {
	let res = romanize(context);
	if (typeof (res) == 'string') {
		return res;
	}
	else {
		return 'ConvertErr';
	}
}

export {romanize, romanizeHelper};
export default romanizeHelper;