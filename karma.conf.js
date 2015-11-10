module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../app/**/*.js',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        '**/*.js'
    ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
