#!/usr/bin/env node
/**
 * Created by swxy on 2017/5/11.
 */

var program = require('commander');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

var config = require('./package.json');
var desc = require('./data/description.json');
// 保存使用
var descPath = path.resolve(__dirname, './data/description.json');

program
    .version(config.version)
    .usage('[options] <file ...>')
    .option('-m, --comment [value]', 'description for branch/cmd');

program
    .command('checkout <branch>')
    .description('run the checkout command')
    .action(function(branch) {
        console.log('checkout branch "%s"', branch);
        checkout(branch);
        saveDescription(branch);
    });

program
    .command('exec <cmd>')
    .description('run the execute command')
    .action(function(cmd) {
        console.log('execute "%s"', cmd);
        saveDescription(cmd);
    });

program
    .command('del <id>')
    .description('run the delete command use id or branch')
    .action(function(id) {
        console.log('delete "%s"', id);
        del(id);
    });

program
    .command('ls')
    .description('run the ls command to show desc')
    .action(function() {
        list();
    });

program
    .command('config [configs...]')
    .description('run the config command to set default git config, if not set parameter then apply the setting')
    .action(function (configs) {
       var conf = require('./lib/config');
       if (configs && configs.length) {
           conf.set(configs);
       }
       else {
           conf.apply();
       }
    });
program
    .command('clone [options...]')
    .description('clone remote git branch')
    .action(function (options) {
        require('./lib/clone').clone(options);
    });

program.parse(process.argv);

function saveToFile() {
    fs.writeFile(descPath, JSON.stringify(desc, null, 4), function (err) {
        if (err) {
            console.error(err);
            return false;
        }
        console.log('save description success');
    })
}

function saveDescription(key) {
    if (!key || !program.comment) {
        return false;
    }
    desc[key] = {
        id: + new Date(),
        desc: program.comment
    };
    saveToFile();
}

function execute(cmd) {
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(stdout, stderr);
    })
}

function checkout(branch) {
    exec('git checkout ' + branch, function(error, stdout, stderr) {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log(stdout, stderr);
    });
}

function del(id) {
    var success = false;
    if (isNaN(id)) {
        if (desc[id]) {
            delete  desc[id];
            success = true;
        }
    }
    else {
        var keys = Object.keys(desc);
        for (var i = 0, l = keys.length; i < l; i++) {
            var item = desc[keys[i]];
            if (item.id === +id) {
                success = true;
                delete desc[keys[i]];
                break;
            }
        }
    }
    console.log(success ? 'delete success' : 'cannot find ' + id);
    success && saveToFile();
}

function list() {
    var text = 'ID                      Time             Branch/Cmd           Desc\n';
    text += Object.keys(desc).map(function (key) {
        var item = desc[key];
        var time = new Date(item.id);
        return item.id + '    ' +  time.toLocaleString() +  '       ' + key + '       ' + item.desc;
    }).join('\n');
    console.log(text);
}