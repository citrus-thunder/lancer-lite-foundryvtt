import './trigger-card.scss';

export default
`
<div class="item-card trigger-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
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