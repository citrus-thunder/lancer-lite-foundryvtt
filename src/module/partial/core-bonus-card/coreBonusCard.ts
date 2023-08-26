import './core-bonus-card.scss';

export default
`
<div class="item-card core-bonus-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Core Bonus" data-item-id="{{id}}"></i>
			</div>
		</div>
		{{#if tags}}
		<div class="tags">
		</div>
		{{/if}}
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`;