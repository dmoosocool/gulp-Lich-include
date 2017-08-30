'use strict';
let path = require('path'),
    _ = require('lodash'),
    executeTpl = require('./executeTpl'),
    executeJs = require('./executeJs'),
    executeCss = require('./executeCss'),
    executeRule = require('./executeRule'),
    fs = require('fs');

let analysis = function analysis(config, inject) {
    this.config = config || {};
    this.inject = inject || {};
    this.filepath = '';
};

/**
 * 分析指令
 * tpl,        模板
 * rule,       规则
 * js-local,   本地js
 * js-npm,     npmjs
 * css-local,  本地css
 * css-npm     npmcss
 */
analysis.prototype.execute = function (file) {
    let content = file.contents.toString(),
        command = this.config.command || 'Lich',
        _this = this;

    this.filepath = file.path;
    // 先替换指令中的变量.
    content = content.replace(/\{\s*([^\}]+)\s*\}/g, function (word, $1) {
        return _this.inject[$1];
    });

    // 解析指令.
    let commandReg = new RegExp('<!--\\s*' + command + '\\s+(\\w+(?:\\-\\w+)?)=(?:\\"([^\\"]+)\\"|\\\'([^\\\']+)\\\')\\s*-->', 'g');
    content = content.replace(commandReg, function (word, type, params) {
        let result = '';
        switch (type) {
            case 'tpl':
                result = executeTpl(params, _this);
                break;
            case 'js-local':
                result = executeJs(params, 'local', _this);
                break;
            case 'js-npm':
                result = executeJs(params, 'npm', _this);
                break;
            case 'css-local':
                result = executeCss(params, 'local', _this);
                break;
            case 'css-npm':
                result = executeCss(params, 'npm', _this);
                break;
            case 'rule':
                result = executeRule(params, _this);
                break;
            default:
                break;
        }
        return result;
    });

    //file.contents = Buffer.from(content);
    return content;
};

module.exports = analysis;