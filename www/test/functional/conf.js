exports.config = {
  directConnect : true,
  framework: 'jasmine2',
  specs: ['report.spec.js'],
};
if (process.env.SNAP_CI) {
    exports.config.directConnect = true;
    exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar'
