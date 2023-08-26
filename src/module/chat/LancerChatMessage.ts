export default class LancerChatMessage extends ChatMessage {
	
	protected override async _renderRollContent(messageData: ChatMessage.MessageData): Promise<void> {
		debugger;
		if (true) { // temp while we work on this
			await super._renderRollContent(messageData);
			return;
		} 
		
		//return renderTemplate('',{});
		let data = messageData.message;
		const rollMessageData = {};
		data.content = await renderTemplate('systems/lancer-lite/templates/chat/roll-message.hbs', rollMessageData);
	}
}