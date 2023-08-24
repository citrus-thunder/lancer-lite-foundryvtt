import './weapon.scss';

export default
`
<div class="weapon-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square weapon-edit" title="Edit Weapon" data-item-id="{{id}}"></i>
				<i class="fa-solid fa-ban weapon-delete" title="Delete Weapon" data-item-id="{{id}}"></i>
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