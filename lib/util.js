/**
 * Created by swxy on 2017/5/18.
 * @desc 提供一下工具函数
 */
const fs = require('fs');

exports.save = function (path, object, callback) {
    fs.writeFile(path, JSON.stringify(object, null, 4), function (err) {
        if (err) {
            console.error(err);
            return false;
        }
        callback && callback();
    });
};

