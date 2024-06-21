define('admin/plugins/custom-user-props',
	['settings','alerts'],
	function (settings, alerts) {
	var ACP = {};

	ACP.init = function () {
		settings.load('custom-user-props', $('.custom-user-props-settings'));
		$('#save').on('click', saveSettings);
	};
	function saveSettings() {
		settings.save('custom-user-props', $('.custom-user-props-settings'), function (){
			alerts.success('Settings Saved');
		});
	}
	return ACP;
});
