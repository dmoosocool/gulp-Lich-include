let gulp = require('gulp'),
    include = require('../index'),
    path = require('path'),
    // Config File.
    config = require('./Lich.rules.config');

let test = function () {
    let injectObject = {
        env: 'test',
        name: 'dmoo'
    };

    return gulp.src('src/module/a.html', { base: config.devDir })
        .pipe(include(config, injectObject))
        .pipe(gulp.dest(config.distDir));
};

let moveFiles = function () {
    let path = [
        'src/**/*',
        '!src/tpl/**/*'
    ];

    return gulp.src(path, { base: config.devDir })
        .pipe(gulp.dest(config.distDir));
}


let defautlTask = gulp.series(moveFiles, test);

gulp.task('default', defautlTask);