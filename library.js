'use strict';

const controllers = require('./lib/controllers');

const meta = require.main.require('./src/meta');
const winston = require.main.require('winston');
var User = require.main.require('./src/user')
const plugin = module.exports;
var db = require.main.require('./src/database');

plugin.init = function (params, callback) {
    winston.info('Initializing custom user props...');
     callback();
};

//{ "hook": "filter:account/edit.build", "method": "filterAccountEditBuild" },
plugin.filterAccountEditBuild = async (hookData) => {
    console.log('hook filterAccountEditBuild------');
    return hookData;
};

//{ "hook": "response:router.page", "method": "filterRouterPage" },
plugin.filterRouterPage = async (hookData) => {
    console.log('hook filterRouterPage------',hookData.req.route.path);
    if (hookData.req.route.path === '/user/:userslug/edit') {
        console.log('hook filterRouterPage-filterAccountProfileEditBuild------');
        // 在这里处理你的逻辑
    }
    return hookData;
};
//完成更新到前执行
plugin.filterUpdateProfile = function(hookData) {
    // var uid = data.uid;
    // console.log('hook filterUpdateProfile------');
    hookData.fields = [
        ...hookData.fields,
        'snsUrl',
        'domainType',
        'followerSize',
        'platform'
    ]
    return hookData
     // 使用 NodeBB 的 User.updateProfile 方法更新用户的自定义字段
    //  User.updateProfile(uid, data,[ "snsUrl"])
    //  .then(function() {
    // 	console.log('updateProfile success------');
    //  }).catch(function(err) {
    // 	console.log('updateProfile error------',err);
    //  });
};
//完成更新动作后执行
plugin.actionUserUpdateProfile = function (hookData){
    // console.log('hook actionUserUpdateProfile------');
    return hookData;
}
//去用户数据前执行
plugin.filterUserWhitelistFields = function (hookData){
    // console.log('hook filterUserWhitelistFields------');
    hookData.whitelist.push('snsUrl');
    hookData.whitelist.push('domainType');
    hookData.whitelist.push('followerSize');
    hookData.whitelist.push('platform');
    return hookData;
}
