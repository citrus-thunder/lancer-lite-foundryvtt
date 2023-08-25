import TriggerCard from "./trigger-card/triggerCard";
import WeaponCard from "./weapon-card/weaponCard";


const partials = {
	registerAll: function() {
		Handlebars.registerPartial('trigger-card', TriggerCard);
		Handlebars.registerPartial('weapon-card', WeaponCard);
	}
}

export default partials;