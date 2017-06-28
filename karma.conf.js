// Karma configuration
// Generated on Tue Nov 24 2015 00:33:40 GMT-0200 (BRST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: ['karma-chrome-launcher', 'karma-jasmine', 'karma-phantomjs-launcher'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'www/lib/underscore/underscore-min.js',
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/ngCordova/dist/ng-cordova.min.js',
      'www/lib/moment.min.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/autocomplete/index',
      'www/js/app-settings.js',
      'www/test/unit/globals.js',
      'www/js/app.js',
      'www/js/**/*.js',
      'www/test/unit/**/*.js',
      'www/lib/angular-simple-logger/dist/angular-simple-logger.min.js',
      'www/lib/angular-google-maps/dist/angular-google-maps.min.js',
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDNGPh2ERYJq9Ei1tzDSNG-nOyYAJVhpY4'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/www/js/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        dir: 'test-results/unit/coverage/',
        reporters:[
            {type: 'html'},
            {type: 'lcovonly'}
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // customLaunchers for Travis CI
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'ChromeHeadless',
        flags: [
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222'
        ]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  });
};
