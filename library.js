'use strict';

const controllers = require('./lib/controllers');
const nconf = require.main.require('nconf');
const winston = require.main.require('winston');
const plugin = module.exports;
const routeHelpers = require.main.require('./src/routes/helpers');

const meta = require.main.require('./src/meta');
var User = require.main.require('./src/user')
var db = require.main.require('./src/database');
//
plugin.init = async function (params, callback) {
	console.log('Initializing custom user props...');
    const { router /* , middleware , controllers */ } = params;
    winston.info('Initializing custom user props...');
    let setting = await meta.settings.get('custom-user-props');
    //注册用户自定义字段,customFields默认有四个字段
    //检查customFields，如果缺少默认字段，添加默认字段到customFields
	let defaultFields = [
		{ name: 'snsUrl', label: '[[custom-user-props:snsUrl]]', type: 'text' },
		{ name: 'domainType', label: '[[custom-user-props:domainType]]', type: 'select',
			options: 'beauty,health,baby,travel' },
		{ name: 'followerSize', label: '[[custom-user-props:followerSize]]', type: 'select',
			options: 'less_than_5k,10k,50k,100k,more_than_100k' },
		{ name: 'platform', label: '[[custom-user-props:platform]]', type: 'select',
			options: 'wechat,weibo,douyin,kuaishou,xiaohongshu,twitter,instagram,facebook' }
	]
	if(!setting?.customFields?.length){
		setting.customFields = defaultFields;
	}
	defaultFields.forEach(defaultField => {
		if (!setting.customFields.some(field => field.name === defaultField.name)) {
			setting.customFields.push(defaultField);
		}
	});
    await meta.settings.set('custom-user-props', { ...setting });
    //注册用户可查看的页面
    routeHelpers.setupPageRoute(router, '/custom-user-props', [(req, res, next) => {
        winston.info(`[plugins/custom-user-props] In middleware. This argument can be either a single middleware or an array of middlewares`);
        setImmediate(next);
    }], async (req, res) => {
        winston.info(`[plugins/custom-user-props] Navigated to ${nconf.get('relative_path')}/custom-user-props`);

        let user = await User.getUserFields(req.uid, []);
        console.log('user:', user);
        res.render('custom-user-props', {
            customFields: setting.customFields,
            uid: req.uid,
            snsUrl: user.snsUrl,
            followerSize: user.followerSize,
            platform: user.platform,
        });
    });
    //注册管理员可查看的页面
    routeHelpers.setupAdminPageRoute(router, '/admin/plugins/custom-user-props', controllers.renderAdminPage);
 };

//{ "hook": "filter:account/edit.build", "method": "filterAccountEditBuild" },
plugin.filterAccountEditBuild = async (hookData) => {
    let setting = await meta.settings.get('custom-user-props');
    hookData.templateData.customFields = setting.customFields;
    return hookData;
};
//{ "hook": "response:router.page", "method": "filterRouterPage" },
plugin.filterRouterPage = async (hookData) => {
    console.log('hook filterRouterPage------', hookData.req.route.path);
    if (hookData.req.route.path === '/user/:userslug/edit') {
        console.log('hook filterRouterPage-filterAccountProfileEditBuild------');
        // 在这里处理你的逻辑
    }
    return hookData;
};

//完成更新到前执行
plugin.filterUpdateProfile = async function (hookData) {
    let setting = await meta.settings.get('custom-user-props');
    if (setting.customFields && setting.customFields.length) {
        setting.customFields.forEach(field => {
            if (hookData.data[field.name] !== undefined) {
                hookData.data[field.name] = hookData.data[field.name];
            }
        });
    }
    return hookData;
};
//完成更新动作后执行
plugin.actionUserUpdateProfile = function (hookData) {
    // console.log('hook actionUserUpdateProfile------');
    return hookData;
}
//去用户数据前执行
plugin.filterUserWhitelistFields = async function (hookData) {
    // console.log('hook filterUserWhitelistFields------');
    hookData.whitelist.push('customFields');
    let setting = await meta.settings.get('custom-user-props');
    if (setting.customFields.length) {
        setting.customFields.forEach(field => {
            hookData.whitelist.push(field.name);
        });
    }
    // hookData.whitelist.push('snsUrl');
    // hookData.whitelist.push('domainType');
    // hookData.whitelist.push('followerSize');
    // hookData.whitelist.push('platform');
    return hookData;
}
plugin.filterUserGetFields = async function (hookData) {
    let setting = await meta.settings.get('custom-user-props');
    hookData.users.forEach(user => {
        user.customFields = setting.customFields;
        setting.customFields.forEach(field => {
            if (!user[field.name]) {
                user[field.name] = '';
            }
        });
    });
    return hookData;
}
//注册插件到admin导航栏
plugin.addAdminNavigation = (header) => {
    header.plugins.push({
        route: '/plugins/custom-user-props',
        icon: 'fa-user',
        name: 'Custom-User-Props',
    });
    return header;
};

