exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  specs: ['report.spec.js'],
};

if (process.env.SNAP_CI) {
  exports.config.directConnect = true;
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
} else {
  exports.config.seleniumAddress = 'http://localhost:4444/wd/hub';
}
