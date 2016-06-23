var scrollIntoView = function(element) {
  browser.executeScript(function (element) {
    element.scrollIntoView();
  }, element.getWebElement());
};

var clearInputAddress = function() {
  element(by.model('chosenPlace')).clear();
};

var checkAddressInputContainsText = function(text) {
  var addressInput = findAddressInput();
  expect(addressInput.getAttribute('value')).toContain(text);
};

/*var submitAddressSearch = function() {
  return element(by.buttonText('Buscar')).click();
};*/

var findLiElements = function() {
  //return element.all(by.css('.place-list'));
  return element.all(by.css('.pac-container'));
};

var findAddressInput = function() {
  return element(by.model('chosenPlace'));
};

var Home = function() {

  this.reportRisk = function () {
    var reportRiskButton = element(by.buttonText('Reportar risco'));
    scrollIntoView(reportRiskButton);
    return reportRiskButton.click();
  };
};

module.exports = Home;
