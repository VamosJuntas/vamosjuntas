var scrollIntoView = function(element) {
  browser.executeScript(function (element) {
    element.scrollIntoView();
  }, element.getWebElement());
};

var Home = function() {
  this.reportRisk = function () {
    var reportRiskButton = element(by.buttonText('Reportar risco'));
    scrollIntoView(reportRiskButton);
    return reportRiskButton.click();
  };

  this.fillSearchText = function(textToFill) {
    var textField = element(by.model('search.text'));
    textField.sendKeys(textToFill);
    textField.sendKeys(protractor.Key.TAB);
    return this;
  };

  this.clickSearchButton = function() {
    var searchButton = element(by.buttonText('Buscar'));
    browser.driver.sleep(10000);
    searchButton.click();
    return this;
  };

  this.clickRiskDetails = function() {
    browser.wait(function() {
      return element(by.repeater('place in places')).isPresent();
    });

    var lastPlace = element.all(by.repeater('place in places')).last();
    lastPlace.click();
    return this;
  };
};

module.exports = Home;
