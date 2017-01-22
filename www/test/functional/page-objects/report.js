 var Report = function () {

  this.fillAddress = function (content) {
    element(by.model('report.address')).sendKeys(content);
    return this;
  };

  this.getAddress = function() {
    return element(by.model('report.address')).getAttribute('value');
  };

  this.fillDateWithFormat = function(date) {
    element(by.className('date')).sendKeys(date);
    element(by.className('date')).sendKeys('A');
    return this;
  };

  this.fillRisk = function (risk) {
    element(by.cssContainingText('option', risk)).click();
    return this;
  };

  this.submitButtonClick = function() {
    element(by.css('[ng-click="submit(reportForm.$valid)"]')).click();
    return this;
  };

  this.submitButton = function() {
    return element(by.buttonText('Enviar'));
  };

  this.backButton = function() {
    element(by.id('backBtn')).click();
    return this;
  };

  this.isSubmitButtonEnabled = function() {
    return element(by.buttonText('Enviar')).isEnabled();
  };

};

module.exports = Report;
