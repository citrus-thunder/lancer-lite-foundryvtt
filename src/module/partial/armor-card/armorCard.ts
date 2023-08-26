import './armor-card.scss';

export default
`
<div class="item-card armor-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Armor" data-item-id="{{id}}"></i>
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