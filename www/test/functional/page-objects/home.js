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
  return element.all(by.css('.pac-matched'));
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

/*  this.searchExistingAddress = function() {
    this.fillAddress('Dom Pedro');
    submitAddressSearch();
    checkAddressInputContainsText();
    //assert
  }*/

 this.searchAutoCompleteAddress = function() {
    this.fillAddress('Dom Pedro');
    //submitAddressSearch();
    findLiElements().then(function(items){
        expect(items.length).toBeGreaterThan(1);
    });
  }

  this.searchNonExistentAddress = function() {
    this.fillAddress('invalidAddress');
 /*   submitAddressSearch();*/
    findLiElements().then(function(items){
      expect(items[0].isEmpty());
    });
  }

  this.fillAddress = function(text) {
    clearInputAddress();
    var addressInput = findAddressInput();
    return addressInput.sendKeys(text);
  }

 this.selectFirstAddress = function() {
    //element(by.buttonText('Buscar')).click();
    findLiElements().then(function(items) {
      var firstPlace = items[0];
      firstPlace.click();
      firstPlace.innerText.then(function(text) {
        checkAddressInputContainsText(text);
      });
    });
  }

};

module.exports = Home;
