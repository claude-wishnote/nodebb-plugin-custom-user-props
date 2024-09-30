'use strict';

define('admin/plugins/custom-user-props', ['settings', 'alerts'], function(Settings, alerts) {
    var ACP = {};

    ACP.init = function() {
        Settings.load('custom-user-props', $('.custom-user-props-settings'));

        $('#save').on('click', function() {
            Settings.save('custom-user-props', $('.custom-user-props-settings'), function() {
                alerts.alert({
                    type: 'success',
                    alert_id: 'custom-user-props-saved',
                    title: '[[custom-user-props:settings-saved]]',
                    message: '[[custom-user-props:settings-saved-message]]',
                    clickfn: function() {
                        socket.emit('admin.reload');
                    }
                });
            });
        });

        $('#add-field').on('click', function() {
            var fieldHtml = '<div class="field">' +
                '<input type="text" class="form-control" name="name" placeholder="[[custom-user-props:field-name]]">' +
                '<select class="form-control" name="type">' +
                    '<option value="text">[[custom-user-props:text]]</option>' +
                    '<option value="select">[[custom-user-props:select]]</option>' +
                '</select>' +
                '<input type="text" class="form-control" name="options" placeholder="[[custom-user-props:options]]">' +
                '<button class="btn btn-danger remove-field">[[custom-user-props:remove]]</button>' +
                '</div>';
            $('.fields-container').append(fieldHtml);
        });

        $('.fields-container').on('click', '.remove-field', function() {
            $(this).closest('.field').remove();
        });
    };

    return ACP;
});