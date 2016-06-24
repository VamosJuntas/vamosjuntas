var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: './test-results/functional/screenshots',
  filename: 'functional-test-report.html'
});

exports.config = {

  beforeLaunch: function() {
      return new Promise(function(resolve){
        reporter.beforeLaunch(resolve);
      });
   },

  onPrepare: function() {
    jasmine.getEnv().addReporter(reporter);
  },

  afterLaunch: function(exitCode) {
      return new Promise(function(resolve){
        reporter.afterLaunch(resolve.bind(this, exitCode));
      });
  },

  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      prefs: {
        "profile.default_content_setting_values.geolocation": 1,
      }
    }
  },

  directConnect : true,
  framework: 'jasmine2',
  specs: ['report.spec.js'],
};
if (process.env.SNAP_CI) {
    exports.config.directConnect = true;
    exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar'
