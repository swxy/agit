/**
 * Created by swxy on 2017/5/15.
 * @desc 用于设置一些常用的git配置，像用户名，邮箱之类的用户信息
 */
const fs = require('fs');
const path = require('path');
const util = require('./util');
const exec = require('child_process').exec;
const configPath = path.resolve(__dirname, '../data/config.json');
const configData = require(configPath);

function setConfig(configs) {
    configs.map(function (item) {
        return item.split('=');
    }).forEach(function (item) {
        configData[item[0]] = item[1];
    });

    util.save(configPath, configData);
}

function applyConfig() {
    const prefix = 'git config ';
    const cmds = [];
    Object.keys(configData).forEach(function (key) {
        cmds.push(prefix + key + ' ' + configData[key]);
    });
    const cmd = cmds.join('; ');
    console.log(cmd);
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log('set config success');
    });
}

function deleteConfig(configKey) {
    if (configData[configKey]) {
        delete configData[configKey];
        util.save(configPath, configData, function () {
            console.log('delete success');
        });
    }
    else {
        console.log('not found: ' + configKey);
    }
}

function clearConfig() {
    console.log('clearing...');
    listConfig();
    util.save(configPath, {}, function () {
        console.log('clear success');
    })
}

function listConfig() {
    const result = Object.keys(configData).map(function (key) {
        const value = configData[key];
        return key + ':    ' + value;
    }).join('\n');
    console.log(result);
}

module.exports = {
    set: setConfig,
    apply: applyConfig,
    delete: deleteConfig,
    clear: clearConfig,
    list: listConfig
};
