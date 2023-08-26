import './weapon-card.scss';

export default
`
<div class="item-card weapon-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Weapon" data-item-id="{{id}}"></i>
			</div>
		</div>
		{{#if tags}}
		<div class="tags">
		</div>
		{{/if}}
		<div class="traits">
			{{#if system.range}}[Range: {{system.range}}]{{/if}} {{#if system.damage.value}}[Damage: {{system.damage.value}} ({{system.damage.type}})]{{/if}}
		</div>
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`;