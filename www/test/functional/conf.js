exports.config = {
  framework: 'jasmine',
  specs: ['report.spec.js'],
};

if (process.env.SNAP_CI) {
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
