let fs = require('fs'),
    path = require('path');

/**
 * 同步创建多级目录.
 */
module.exports = function mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
};