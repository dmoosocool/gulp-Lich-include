let analysis = require('./utils/analysis'),
    through = require('through2');
/**
 *
 * @param config        配置文件.
 * @param injectObj     注入的一个对象, 可供gulp-Lich-include组件使用.
 * @returns 返回一个流.
 */
module.exports = function (config, injectObj) {
    let LichAnalysis = new analysis(config, injectObj);
    // 创建一个让每个文件通过的 stream 通道
    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        // 解析指令
        file = LichAnalysis.execute(file);
        return callback(null, file);
    });
};
