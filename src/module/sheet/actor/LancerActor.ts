export default class LancerActor extends Actor {
	getRollData(): object {
		return super.getRollData();
	}

	public async toggleActiveEffect(effectData: any, active?: boolean) {
		if (!effectData.id) {
			return false;
		}

		const existingEffects = this.effects.reduce((acc: any[], cur) => {
			const c = cur as any;
			if (c.statuses.size === 1 && c.statuses.has(effectData.id)) {
				acc.push(c.id);
			}

			return acc;
		}, []);

		const state = active ?? !existingEffects.length;
		if (!state && existingEffects.length) {
			await this.deleteEmbeddedDocuments('ActiveEffect', existingEffects);
		}
		else if (state) {
			const aeClass = CONFIG.ActiveEffect.documentClass;
			const data = foundry.utils.deepClone(effectData);
			foundry.utils.setProperty(data, 'statuses', [effectData.id]);
			delete data.id;
			//aeClass.migrateDataSafe(data);
			//aeClass.cleanData(data);
			await aeClass.create(data, { parent: this });
		}
	}
}