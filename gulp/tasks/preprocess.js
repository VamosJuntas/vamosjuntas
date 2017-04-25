var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var replace = require('gulp-replace-task');
var appSettings = './templates/app-settings.js';

gulp.task('preprocess:dev', function() {
  gulp.src(appSettings)
      .pipe(replace({
        patterns: [
          {
            match: 'apiKey',
            replacement: process.env.API_KEY
          }
        ]
      }))
      .pipe(preprocess({context: {NODE_ENV: 'DEVELOPMENT'}}))
      .pipe(gulp.dest('./www/js/'));
});

gulp.task('preprocess:prod', function() {
  gulp.src(appSettings)
    .pipe(replace({
      patterns: [
        {
          match: 'apiBaseUrl',
          replacement: process.env.API_BASE_URL || 'http://localhost:3001'
        },
        {
          match: 'apiKey',
          replacement: process.env.API_KEY || 'NO_KEY'
        }
      ]
    }))
    .pipe(preprocess({context: { NODE_ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./www/js/'));
});
