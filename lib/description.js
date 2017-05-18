/**
 * Created by swxy on 2017/5/18.
 * @desc 给branch添加描述信息
 */

const path = require('path');
const util = require('./util');
const descData = require('../data/description.json');
const descPath = path.resolve(__dirname, '../data/description.json');

function add (key, value) {
    descData[key] = {
        id: + new Date(),
        desc: value
    };
}

function addDescription(branchName, options) {
    if (!branchName || !options.comment) {
        return false;
    }
    add(branchName, options.comment);
    util.save(descPath, descData);
}

function formatDescription (branch, info) {
    const time = new Date(info.id);
    return time.toLocaleString() + ':   ' + branch + '    ---    ' + info.desc;
}


function showDescription(branchName) {
    if (branchName && descData[branchName]) {
        console.log(formatDescription(branchName, descData[branchName]));
    }
    else if (!branchName) {
        const result = Object.keys(descData).map(function (branchName) {
            return formatDescription(branchName, descData[branchName]);
        }).join('\n');
        console.log(result);
    }
    else {
        console.log('Not Found Branch: ' + branchName);
    }
}

function deleteDescription(branchName) {
    if (!branchName || !descData[branchName]) {
        console.log('Cannot find branch: ' + branchName);
        return false;
    }
    delete descData[branchName];
    util.save(descPath, descData);
}

function clearDescription() {
    console.log('clear....');
    Object.keys(descData).forEach(function (branchName) {
        console.log(formatDescription(branchName, descData[branchName]));
    });
    util.save(descPath, {}, () => {
        console.log('clear success');
    });
}

module.exports = {
    addDescription: addDescription,
    showDescription: showDescription,
    deleteDescription: deleteDescription,
    clearDescription: clearDescription
};