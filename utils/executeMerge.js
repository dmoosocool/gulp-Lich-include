'use strict';
/**
 * 文件合并
 *
 * @param file {string} js路径, 引用多个js以","分割.
 * @param type {string} css|js
 * @param ctx  context
 *
 */
let path = require('path'),
    mkdirs = require('./mkdirs'),
    fs = require('fs');

module.exports = function executeMerge(params, type, ctx) {
    let result = [],
        realPath = '',
        outputRealPath = '',
        outputPath = '',
        resultPath = path.dirname(ctx.filepath.replace(ctx.config.devDir, ctx.config.distDir)),
        _this = ctx,
        mergeOpt = {
            output: params.toString().indexOf(':') > -1 ? params.toString().split(':')[0] : 'noname' + +new Date(),
            files: params.toString().indexOf(':') > -1 ? (params.toString().split(':')[1].indexOf(',') > -1 ? params.toString().split(':')[1].split(',') : []) : []
        },
        extension = 'js-local' === type ? _this.config.jsExtension : 'css-local' == type ? _this.config.cssExtension : '';


    mergeOpt.files.forEach(function(item) {
        realPath = path.resolve(path.dirname(_this.filepath), path.join(path.dirname(_this.filepath), item) + extension);
        result.push(fs.readFileSync(realPath).toString());
    });

    outputRealPath = path.resolve(resultPath, path.join(resultPath, mergeOpt.output) + extension) || ' ';

    fs.writeFileSync(outputRealPath, result.join('\n'));

    outputPath = path.relative(path.dirname(_this.filepath), path.join(path.dirname(_this.filepath), mergeOpt.output) + extension);

    if ('js-local' === type) {
        return `<script src="${outputPath}" type="text/javascript"></script>` + '\n\t';
    }

    if ('css-local' === type) {
        return `<link rel="stylesheet" href="${outputPath}"/>` + '\n\t';
    }
}