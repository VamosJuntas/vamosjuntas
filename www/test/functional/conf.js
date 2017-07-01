var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: './test-results/functional/screenshots',
  filename: 'functional-test-report.html'
});

exports.config = {

  chromeDriver: '../../../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.28',

  seleniumServerJar: '../../../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',

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
      args: [ "--headless", "--disable-gpu", "--remote-debugging-port=9222", "--dump-dom", "--no-sandbox" ],
      prefs: {
        "profile.default_content_setting_values.geolocation": 1,
      }
    },
    isHeadless: true
  },

  directConnect : true,
  framework: 'jasmine2',
  specs: ['*.spec.js'],
};

if (process.env.TRAVIS) {
  // exports.config.chromeDriver = '/home/travis/build/VamosJuntas/vamosjuntas/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.29';
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
