'use strict';
/**
 * 解析模板指令
 * @param tpl {string} 模板路径, 引用多个模板以","分割.
 * @returns {string}
 */

let path = require('path'),
    fs = require('fs');

module.exports = function executeTpl(tpl, ctx) {
    let files = tpl.indexOf(',') > -1 ? tpl.split(',') : [tpl],
        result = [],
        realPath = '',
        _this = ctx;

    files.forEach(function (item) {
        item = item.trim();
        realPath = path.resolve(path.dirname(_this.filepath), path.join(_this.config.devDir, item)) + _this.config.tplExtension;
        let tplContent = fs.readFileSync(realPath, { encoding: 'utf-8', flag: 'r' });
        result.push(tplContent);
    });

    return result.join('\n');
}