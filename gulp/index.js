var gulp = require('gulp');

require('./tasks/preprocess');

gulp.task('build-prod', ['preprocess:prod']);
gulp.task('build-dev', ['preprocess:dev']);
