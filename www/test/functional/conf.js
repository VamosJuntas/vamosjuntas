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
      // args: [
      //   // "--headless",
      //   // "--disable-gpu",
      //   // "--remote-debugging-port=9222",
      //   // "--dump-dom",
      //   // "--no-sandbox",
      //   // "--window-size=800x600",
      //   "--no-default-browser-check",
      //   "--no-first-run",
      //   "--disable-default-apps"
      // ],
      prefs: {
        "profile.default_content_setting_values.geolocation": 1,
      }
    }
  },

  directConnect : true,
  framework: 'jasmine2',
  specs: ['*.spec.js'],
};

if (process.env.TRAVIS) {
  exports.config.directConnect = true;
  exports.config.chromeDriver = '/home/travis/build/VamosJuntas/vamosjuntas/node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.30';
}
