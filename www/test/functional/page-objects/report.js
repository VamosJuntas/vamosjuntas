 var Report = function () {

  this.fillAddress = function (content) {
    return element(by.model('report.address')).sendKeys(content);
  };

  this.fillDate = function (date) {
    return element(by.className('date')).sendKeys(date.getMonth(),date.getDate(),date.getYear(),
        protractor.Key.TAB,date.getHours(),date.getMinutes(),
        protractor.Key.TAB, "PM");
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
