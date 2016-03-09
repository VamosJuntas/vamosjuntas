exports.config = {
  directConnect : true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine2',
  specs: ['report.spec.js'],
};

if (process.env.SNAP_CI) {
  exports.config.directConnect = true;
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
} else {
  exports.config.seleniumAddress = 'http://localhost:4444/wd/hub';
}
