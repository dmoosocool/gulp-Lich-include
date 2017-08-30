'use strict';
/**
 * 解析js
 * @param file {string} js路径, 引用多个js以","分割.
 * @param type local|npm
 * @param ctx  context
 */
let path = require('path'),
    mkdirs = require('./mkdirs'),
    fs = require('fs');

module.exports = function executeCss(file, type, ctx) {
    let files = file.indexOf(',') > -1 ? file.split(',') : [file],
        result = [],
        realPath = '',
        resultPath = path.dirname(ctx.filepath.replace(ctx.config.devDir, ctx.config.distDir)),
        _this = ctx;

    files.forEach(function (item) {
        item = item.trim();
        if ('local' === type) {
            // 获取相对路径.
            realPath = path.relative(_this.config.distDir, path.join(_this.config.distDir, item)) + _this.config.cssExtension;

        }

        if ('npm' === type) {
            // 将npm文件写入到输出目录中.
            let npmFile = path.join(process.cwd(), 'node_modules', item) + _this.config.cssExtension,
                distFile = path.join(_this.config.distDir, 'node_modules', item) + _this.config.cssExtension;

            // 避免空空目录
            try {
                fs.accessSync(path.dirname(distFile), fs.F_OK);
            } catch (e) {
                mkdirs(path.dirname(distFile));
            }

            // 同步写npm文件.
            fs.writeFileSync(distFile, fs.readFileSync(npmFile));

            // 获取相对路径. 在当前项目目录中的node_modules文件中。
            realPath = path.relative(resultPath, distFile);
        }

        result.push(`<link rel="stylesheet" href="${realPath}"/>`);
    });

    return result.join('\n');
}