var scrollIntoView = function(element) {
  browser.executeScript(function (element) {
    element.scrollIntoView();
  }, element.getWebElement());
};

var clearInputAddress = function() {
  element(by.model('search.text')).clear();
};

var checkAddressInputContainsText = function(text) {
  var addressInput = findAddressInput();
  expect(addressInput.getAttribute('value')).toContain(text);
};

var submitAddressSearch = function() {
  return element(by.buttonText('Buscar')).click();
};

var findLiElements = function() {
  return element.all(by.css('.place-list li'));
};

var findAddressInput = function() {
  return element(by.model('search.text'));
};

var Home = function() {

  this.reportRisk = function () {
    var reportRiskButton = element(by.buttonText('Reportar risco'));
    scrollIntoView(reportRiskButton);
    return reportRiskButton.click();
  };

  this.searchExistingAddress = function() {
    this.fillAddress('Dom Pedro');
    submitAddressSearch();
    findLiElements().then(function(items){
      expect(items[0].getText()).toContain('Dom Pedro');
    });
  }

  this.searchNonExistentAddress = function() {
    this.fillAddress('invalidAddress');
    submitAddressSearch();
    findLiElements().then(function(items){
      expect(items[0].getText()).toContain('Nenhum resultado encontrado.');
    });
  }

  this.fillAddress = function(text) {
    clearInputAddress();
    var addressInput = findAddressInput();
    return addressInput.sendKeys(text);
  }

  this.selectFirstAddress = function() {
    element(by.buttonText('Buscar')).click();
    findLiElements().then(function(items) {
      var firstPlace = items[0];
      firstPlace.click();
      firstPlace.getText().then(function(text) {
        checkAddressInputContainsText(text);
      });

    });
  }

};

module.exports = Home;
