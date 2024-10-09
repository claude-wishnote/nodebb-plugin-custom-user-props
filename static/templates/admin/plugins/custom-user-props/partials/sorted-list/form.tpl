<form>
    <div class="mb-3">
        <label class="form-label" for="name">[[custom-user-props:name]]</label>
        <input type="text" id="name" name="name" class="form-control" placeholder="Name" />
    </div>
    <div class="mb-3">
        <label class="form-label" for="label">[[custom-user-props:label]]</label>
        <input type="text" id="label" name="label" class="form-control" placeholder="Label" />
    </div>
    <div class="mb-3">
        <label class="form-label" for="type">[[custom-user-props:type]]</label>
        <select id="type" name="type" class="form-control" placeholder="Type" >
            <option value="text" text="Text">Text</option>
            <option value="select" text="Select">Select</option>
        </select>
    </div>
    <div class="mb-3">
        <label class="form-label" for="options">[[custom-user-props:options]]</label>
        <input type="text" id="options" name="options" class="form-control" placeholder="Options" />
    </div>
    <div class="mb-3">
        <label class="form-label" for="regProp">[[custom-user-props:regProp]]</label>
        <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" id="regProp" name="regProp" role="switch" data-property="regProp">
        </div>
    </div>
</form>