export default class LancerChatMessage extends ChatMessage {

	protected override async _renderRollContent(messageData: ChatMessage.MessageData): Promise<void> {
		let data: any = messageData.message;
		data.rolls = await this._renderRolls();
		data.content = await renderTemplate('systems/lancer-lite/template/chat/dice/roll-message.hbs', data);
	}

	private async _renderRolls() {
		let html = '';
		for (let roll of this['rolls']) {
			html += await roll.render();
		}
		return html;
	}
}