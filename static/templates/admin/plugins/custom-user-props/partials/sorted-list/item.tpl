<li data-type="item" class="list-group-item">
    <div class="d-flex gap-2 justify-content-between align-items-start">
        <div class="flex-grow-1">
            <label><strong>[[custom-user-props:name]]:</strong></label><strong>{name}</strong><br />
            <label><strong>[[custom-user-props:label]]:</strong></label><strong>{label}</strong><br />
            <label><strong>[[custom-user-props:type]]:</strong></label><strong>{type}</strong><br />
            <label><strong>[[custom-user-props:options]]:</strong></label><strong>{options}</strong><br />
            <label><strong>[[custom-user-props:regProp]]:</strong></label>
            <strong class="text-danger">
                 {regProp}
            </strong>
            <br />
        </div>
        <div class="d-flex gap-1 flex-nowrap">
            <button type="button" data-type="edit" class="btn btn-sm btn-info">[[custom-user-props:edit]]</button>
            <button type="button" data-type="remove" class="btn btn-sm btn-danger">[[custom-user-props:delete]]</button>
        </div>
    </div>
</li>   