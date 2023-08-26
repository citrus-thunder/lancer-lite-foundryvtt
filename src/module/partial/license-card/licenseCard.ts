import './license-card.scss';

export default
`
<div class="item-card license-card" data-item-id="{{id}}">
	<div class="header --level-{{system.level}}">
		<div class="title-row">
			{{name}} {{romanize system.level}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit License" data-item-id="{{id}}"></i>
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