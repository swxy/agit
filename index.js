#!/usr/bin/env node
/**
 * Created by swxy on 2017/5/11.
 * @desc 注册命令
 */

const program = require('commander');

program
    .version('1.0.0')
    .usage('[options] <file ...>');

program
    .command('checkout <branch>')
    .description('run the checkout command')
    .option('-m, --comment [value]', 'description for branch/cmd')
    .action(function(branch, options) {
        require('./lib/checkout').checkout(branch);
        require('./lib/description').addDescription(branch, options);
    });

program
    .command('del [branch]')
    .description('delete branch description')
    .option('-a, --all', 'clear branch description')
    .action(function(branch, options) {
        const desc = require('./lib/description');
        if (options.all) {
            desc.clearDescription();
        }
        else {
            desc.deleteDescription(branch);
        }
    });

program
    .command('ls [branch]')
    .description('list branch description')
    .action(function(branch) {
        require('./lib/description').showDescription(branch);
    });

program
    .command('config [configs...]')
    .usage('agit config user.name=xxxx user.email=xxx@xx.com \n' +
        ' agit config -l // list config \n ' +
        ' agit config -d user.name // delete user.name \n' +
        ' agit config // apply the config')
    .description('set default git config, if parameter not set then apply the setting')
    .option('-d --delete [value]', 'delete config like user.name')
    .option('-c --clear', 'clear config')
    .option('-l --list', 'show all config')
    .action(function (configs, options) {
       const conf = require('./lib/config');
       // 设置配置为主
       if (configs && configs.length) {
            conf.set(configs);
       }
       else if (options.clear) {
           conf.clear();
       }
       else if (options.delete) {
           conf.delete(options.delete);
       }
       else if (options.list) {
           conf.list();
       }
       else if (configs && configs.length) {
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