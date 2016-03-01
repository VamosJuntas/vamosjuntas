var Report = function () {

  this.fillAddress = function (content) {
    return element(by.model('report.address')).sendKeys(content);
  };

  this.fillDate = function (date) {
    return element(by.model('report.date')).sendKeys(date);
  };

  this.fillPeriod = function (period) {
    return element(by.cssContainingText('option', period)).click();
  };

  this.fillRisk = function (risk) {
    return element(by.cssContainingText('option', risk)).click();
  };

  this.submitButtonClick = function() {
    return element(by.buttonText('Enviar')).click();
  };

  this.submitButton = function() {
    return element(by.buttonText('Enviar'));
  };

};

module.exports = Report;
