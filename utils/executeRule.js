'use strict';
/**
 * 解析js
 * @param file {string} js路径, 引用多个js以","分割.
 * @param type local|npm
 * @param ctx  context
 */
let path = require('path'),
    executeJs = require('./executeJs'),
    executeCss = require('./executeCss'),
    fs = require('fs');

module.exports = function executeRule(rule, ctx) {
    let rules = rule.indexOf(',') > -1 ? rule.split(',') : [rule],
        result = [],
        _this = ctx;

    rules.forEach(function (rule) {
        rule = _this.config.rules[rule];
        rule.forEach(function (item) {
            switch (item.type) {
                case 'js-local':
                    result.push(executeJs(item.list.join(','), 'local', _this));
                    break;
                case 'js-npm':
                    result.push(executeJs(item.list.join(','), 'npm', _this));
                    break;
                case 'css-local':
                    result.push(executeCss(item.list.join(','), 'local', _this));
                    break;
                case 'css-npm':
                    result.push(executeCss(item.list.join(','), 'npm', _this));
                    break;
            }
        });
    });
    return result.join('\n');
}