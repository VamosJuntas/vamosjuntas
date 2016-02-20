exports.config = {

  capabilities: {
  'browserName': 'chrome'
  },

  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['report.spec.js'],
};

if (process.env.SNAP_CI) {
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
