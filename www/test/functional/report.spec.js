var Splash = require('./page-objects/splash.js');
var Home = require('./page-objects/home.js');
var Report = require('./page-objects/report.js');
var Confirmation = require('./page-objects/confirmation');


describe('Report address form', function() {
  var splash, home, report, confirmation;

  beforeEach(function() {
    splash = new Splash();
    home = new Home();
    report = new Report();
    confirmation = new Confirmation();
  });

  it('should not send to confirmation page without address', function() {
    browser.get('http://localhost:8100/#/report');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    report.fillPeriod('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without date', function() {
    browser.get('http://localhost:8100/#/report');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    report.fillPeriod('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without period', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.className('address')).sendKeys('My address');
    element(by.className('date')).sendKeys('01/30/2015');
    report.fillPeriod('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without risk', function() {
    browser.get('http://localhost:8100/#/report');

    report.fillAddress('My address');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should go through whole report flow and go back to home', function() {
    browser.get('http://localhost:8100/');

    splash.confirmTerms();
    splash.joinApp();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/home');

    home.ReportRisk();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/report');

    report.fillAddress('My address');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    report.fillPeriod('Roubo');
    report.submitButtonClick();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/confirmation');

    confirmation.backToHome();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/home');
  });
});
