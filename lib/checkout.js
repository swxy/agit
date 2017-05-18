/**
 * Created by swxy on 2017/5/18.
 * @desc 用于checkout分支
 */
const exec = require('child_process').exec;

function checkout(branch) {
    exec('git checkout ' + branch, function(error, stdout, stderr) {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(stderr);
    });
}

exports.checkout = checkout;