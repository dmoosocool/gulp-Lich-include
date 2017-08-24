'use strict';
let path = require('path'),
    fs = require('fs');

let analysis = function analysis(config, inject) {
    this.config = config || {};
    this.inject = inject || {};
};

analysis.prototype.execute = function (file) {
    let content = file.contents.toString(),
        filepath = file.path,
        command = this.config.command,
        _this = this;

    /**
     * 分析指令
     * tpl,        模板
     * rule,       规则
     * js-local,   本地js
     * js-npm,     npmjs
     * css-local,  本地css
     * css-npm     npmcss
     */


    /**
     * 解析模板指令
     * @param tpl {string} 模板路径, 引用多个模板以","分割.
     * @returns {string}
     */
    function analysisTpl(tpl) {
        let files = tpl.indexOf(',') > -1 ? tpl.split(',') : [tpl],
            result = [],
            realPath = '';

        files.forEach(function (item) {
            realPath = path.join(_this.config.dev_dir, item) + _this.config.tplExtension;
            let tplContent = fs.readFileSync(realPath, {encoding: 'utf-8', flag: 'r'});
            result.push(tplContent)
        });

        return result.join('\n');
    }

    function analysisRule(rule) {
        let rules = _this.config.rules[rule],
            result = [];

        rules.forEach(function (item) {
            switch (item.type) {
                case 'js-local':
                    result.push(analysisJs(item.list.join(','), 'local'));
                    break;
                case 'js-npm':
                    result.push(analysisJs(item.list.join(','), 'npm'));
                    break;
                case 'css-local':
                    result.push(analysisCss(item.list.join(','), 'local'));
                    break;
                case 'css-npm':
                    result.push(analysisCss(item.list.join(','), 'npm'));
                    break;
            }
        });
        return result.join('\n');
    }

    /**
     * 解析js
     * @param file {string} js路径, 引用多个js以","分割.
     * @param type local|npm
     */
    function analysisJs(file, type) {
        let files = file.indexOf(',') > -1 ? file.split(',') : [file],
            result = [],
            realPath = '';

        files.forEach(function (item) {
            if ('local' === type) {
                // 获取相对路径.
                realPath = path.relative(path.dirname(filepath), item) + _this.config.jsExtension;
            }

            if ('npm' === type) {
                // 获取相对路径. 在当前项目目录中的node_modules文件中。
                realPath = path.relative(path.dirname(filepath), path.join(process.cwd(), 'node_modules', item)) + _this.config.jsExtension;
            }
            result.push(`<script src="${realPath}" type="text/javascript"></script>`);
        });

        return result.join('\n');
    }

    function analysisCss(file, type) {
        let files = file.indexOf(',') > -1 ? file.split(',') : [file],
            result = [],
            realPath = '';

        files.forEach(function (item) {
            if ('local' === type) {
                // 获取相对路径.
                realPath = path.relative(path.dirname(filepath), item) + _this.config.cssExtension;
            }

            if ('npm' === type) {
                // 获取相对路径. 在当前项目目录中的node_modules文件中。
                realPath = path.relative(path.dirname(filepath), path.join(process.cwd(), 'node_modules', item)) + _this.config.cssExtension;
            }
            result.push(`<link rel="stylesheet" href="${realPath}"/>`);
        });

        return result.join('\n');
    }

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
                result = analysisTpl(params);
                break;
            case 'js-local':
                result = analysisJs(params, 'local');
                break;
            case 'js-npm':
                result = analysisJs(params, 'npm');
                break;
            case 'css-local':
                result = analysisCss(params, 'local');
                break;
            case 'css-npm':
                result = analysisCss(params, 'npm');
                break;
            case 'rule':
                result = analysisRule(params);
                break;
            default:
                break;
        }

        return result;
    });

    file.contents = Buffer.from(content);
    return file;
};

module.exports = analysis;