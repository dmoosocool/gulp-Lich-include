let gulp = require('gulp'),
include = require('gulp-lich-include'),
// Config File.
config = require('./Lich.rules.config');

let test = function () {
let injectObject = {
    env: 'test',
    name: 'dmoo'
};

return gulp.src('src/test.html', {base: './src'})
    .pipe(include(config, injectObject))
    .pipe(gulp.dest('./dist'));
};

gulp.task('default', test);