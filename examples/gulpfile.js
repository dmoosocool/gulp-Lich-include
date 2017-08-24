let gulp = require('gulp'),
    include = require('../index'),
    config = require('./Lich.rules.config');

var test = function () {
    return gulp.src('src/test.html', {base: './src'})
        .pipe(include(config, {env: 'test', name: 'dmoo'}))
        .pipe(gulp.dest('./dist'));
};

gulp.task('default', test);