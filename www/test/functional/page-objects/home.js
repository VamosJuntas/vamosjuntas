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

  this.googlePlaceTag = function () {
    return element(by.tagName('googleplace'));
  };
};

module.exports = Home;
