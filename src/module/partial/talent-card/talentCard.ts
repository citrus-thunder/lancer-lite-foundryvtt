import './talent-card.scss';

export default
`
<div class="item-card talent-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}} {{romanize system.rank}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Talent" data-item-id="{{id}}"></i>
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