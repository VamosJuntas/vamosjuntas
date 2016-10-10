 var Report = function () {

  this.fillAddress = function (content) {
    return element(by.model('report.address')).sendKeys(content);
  };

  this.getAddress = function() {
    return element(by.model('report.address')).getAttribute('value');
  }

  this.fillDate = function (date) {
    console.log(date);
    // "10/10/2015 04:00"
    return element(by.className('date')).sendKeys("10102015",
        protractor.Key.TAB, "0400");
  };

  this.fillRisk = function (risk) {
    return element(by.cssContainingText('option', risk)).click();
  };

  this.submitButtonClick = function() {
    return element(by.css('[ng-click="submit(reportForm.$valid)"]')).click();
  };

  this.submitButton = function() {
    return element(by.buttonText('Enviar'));
  };

  this.backButton = function() {
    return element(by.id('backBtn')).click();
  };

};

module.exports = Report;
