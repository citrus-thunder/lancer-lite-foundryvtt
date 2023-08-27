import './trigger-card.scss';

export default
`
<div class="item-card trigger-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			+{{system.bonus}} {{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-dice-d20 trigger-roll" title="Trigger Skill Check" data-item-id="{{id}}"></i>
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Trigger" data-item-id="{{id}}"></i>
			</div>
		</div>
		<div class="tags">
			Trigger
		</div>
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`;