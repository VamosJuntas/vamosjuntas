exports.config = {
  
  seleniumServerJar: "../../../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar",

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: "http://localhost:8000/",

  specs: ['../tests/exemplo.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true
  }
};
