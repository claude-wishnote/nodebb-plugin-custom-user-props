<div>
	<!-- IMPORT admin/partials/settings/header.tpl -->
	<form role="form"  class="custom-user-props-settings">
		<div class="mb-3" data-type="sorted-list" data-sorted-list="customFields" 
			data-item-template="admin/plugins/custom-user-props/partials/sorted-list/item" 
			data-form-template="admin/plugins/custom-user-props/partials/sorted-list/form">
			<input hidden="text" name="customFields">
			<ul data-type="list" class="list-group mb-2"></ul>
			<button type="button" data-type="add" class="btn btn-info">Add Field</button>
		</div>
	</form>
	<!-- IMPORT admin/partials/settings/toc.tpl -->
</div>
