let path = require('path');
/**
 * ${devDir}   开发目录 js-local, css-local的前置目录.
 * ${command}   指令
 *
 * 指令格式: 根据配置的指令解析. <!--${command} ${type}="${params}"-->
 *     用法:
 *          引用模板：       <!--${command} tpl="${params}"-->
 *          引用规则：       <!--${command} rule="${params}"-->
 *          引用本地js：     <!--${command} js-local="${params}"-->
 *          引用npmjs:      <!--${command} js-npm="${params}"-->
 *          引用本地css：    <!--${command} css-local="${params}"-->
 *          引用npmcss：    <!--${command} css-npm="${params}"-->
 *
 * ${type}      类型  支持的类型:
 *                      tpl,        模板
 *                      rule,       规则
 *                      js-local,   本地js
 *                      js-npm,     npmjs
 *                      css-local,  本地css
 *                      css-npm     npmcss
 *
 * ${params}    参数  可以为单个参数 或者以逗号分隔的多个参数.
 *
 * ${rules}                         规则组
 * ${rules}[key]                    规则名称
 * ${rules}[key].type               规则类型, 取值方位为 ${type}. rule不支持套rule.
 * ${rules}[key].list               规则引用的列表
 *
 * 其他说明:
 *      '*-local'       :       默认路径为: ${devDir}
 *      '*-npm'         :       默认路径为: './node_modules/'
 */

module.exports = {
    devDir: path.resolve(process.cwd(), 'src'),
    distDir: path.resolve(process.cwd(), 'dist'),
    tplExtension: '.swig',
    jsExtension: '.js',
    cssExtension: '.css',
    command: 'Lich',
    rules: {
        commonScripts: [{
            type: 'js-local',
            list: [
                'js/test.rule',
                'js/test1.rule'
            ]
        }, {
            type: 'js-npm',
            list: [
                'jquery/dist/jquery.min'
            ]
        }],
        commonStyles: [{
            type: 'css-local',
            list: [
                'css/test1',
                'css/test2'
            ]
        }, {
            type: 'css-npm',
            list: [
                'animate.css/animate'
            ]
        }]
    }
};