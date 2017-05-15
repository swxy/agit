/**
 * Created by swxy on 2017/5/15.
 * @desc 用于设置一些常用的git配置，像用户名，邮箱之类的用户信息
 */
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var configPath = path.resolve(__dirname, '../data/config.json');
var configData = require(configPath);

function setConfig(configs) {
    configs.map(function (item) {
        return item.split('=');
    }).forEach(function (item) {
        configData[item[0]] = item[1];
    });
    fs.writeFile(configPath, JSON.stringify(configData, null, 4), function (err) {
        if (err) {
            console.error(err);
            return false;
        }
        console.log('save config success');
    });
}

function applyConfig() {
    var prefix = 'git config ';
    var cmds = [];
    Object.keys(configData).forEach(function (key) {
        cmds.push(prefix + key + ' ' + configData[key]);
    });
    var cmd = cmds.join('; ');
    console.log(cmd);
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log('set config success');
    });
}

module.exports = {
    set: setConfig,
    apply: applyConfig
};
