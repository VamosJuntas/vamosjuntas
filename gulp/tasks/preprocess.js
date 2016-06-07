var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var appSettings = './templates/app-settings.js';

gulp.task('preprocess:dev', function() {
  gulp.src(appSettings)
      .pipe(preprocess({context: {NODE_ENV: 'DEVELOPMENT'}}))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('preprocess:prod', function() {
  gulp.src(appSettings)
    .pipe(preprocess({context: { NODE_ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./www/js/'));
});
