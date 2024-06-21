'use strict';

const Controllers = module.exports;
const meta = require.main.require('./src/meta');

Controllers.renderAdminPage = async function (req, res/* , next */) {
    /*
        Make sure the route matches your path to template exactly.

        If your route was:
            myforum.com/some/complex/route/
        your template should be:
            templates/some/complex/route.tpl
        and you would render it like so:
            res.render('some/complex/route');
    */
	let setting = await meta.settings.get('custom-user-props');

    res.render('admin/plugins/custom-user-props', {
    	title: 'Custom User Props',
		customFields: setting.customFields
    });
};