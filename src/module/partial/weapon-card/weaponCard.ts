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
		<div class="tags">
			{{tags}}
		</div>
		<div class="traits">
			{{#if range}}[{{range}}]{{/if}} {{#if damage}}[{{damage}} {{damage_type}}]{{/if}}
		</div>
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`;