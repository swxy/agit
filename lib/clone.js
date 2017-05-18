/**
 * Created by swxy on 2017/5/15.
 * @desc use for clone code and setting user or email
 */

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const config = require('./config');

function clone(options) {
    console.log(options);
    exec('git clone ' + options.join(' '), function(error, stdout, stderr) {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(stderr);
        parseCloneDir(stderr);

    });
}

function parseCloneDir(output) {
    // output is string like "Cloning into 'test'..."
    const outputs = output.split(' ');
    if (outputs[0] !== 'Cloning') {
        return false;
    }
    const dir = outputs[2].replace(/'([^']+)'\.\.\.[\s\S]*/g, '$1');
    console.log('Starting directory:' + process.cwd());
    try {
        process.chdir(dir);
        console.log('New directory:' + process.cwd());
        config.apply();
    }
    catch (err) {
        console.log('chdir: ' + err);
    }
}

module.exports = {
    clone: clone
};