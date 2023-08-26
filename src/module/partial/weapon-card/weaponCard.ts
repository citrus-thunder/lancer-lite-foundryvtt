import './weapon-card.scss';

export default
`
<div class="item-card weapon-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-dice-d20 weapon-roll" title="Roll Weapon" data-item-id="{{id}}"></i>
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Weapon" data-item-id="{{id}}"></i>
			</div>
		</div>
		<div class="type">
			{{system.size}} {{system.type}}
		</div>
		{{#if system.tags}}
		<div class="tags">
			{{system.tags}}
		</div>
		{{/if}}
		<div class="traits">
			{{#if system.range}}[Range: {{system.range}}]{{/if}} {{#if system.threat}}[Threat: {{system.threat}}]{{/if}} {{#if system.damage}}[Damage: {{system.damage}}]{{/if}}
		</div>
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`;