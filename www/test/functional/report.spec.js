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
    browser.get('/#/report');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    report.fillPeriod('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without date', function() {
    browser.get('/#/report');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    report.fillPeriod('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without period', function() {
    browser.get('/#/report');
    element(by.className('address')).sendKeys('My address');
    element(by.className('date')).sendKeys('01/30/2015');
    report.fillPeriod('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without risk', function() {
    browser.get('/#/report');

    report.fillAddress('My address');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should go through whole report flow and go back to home', function() {
    browser.get('/');

    splash.confirmTerms();
    splash.joinApp();
    expect(browser.getCurrentUrl()).toContain('/home');

    browser.wait(function() {
      var deferred = protractor.promise.defer();
      element(by.css('.loading-active')).isPresent()
        .then(function (isPresent) {
          deferred.fulfill(!isPresent);
        });
      return deferred.promise;
    }, 3000);


    home.searchExistingAddress();
    home.searchNonExistentAddress();
    home.fillAddress('Rua Dom Pedro II, Porto Alegre');
    home.selectFirstAddress();

    home.reportRisk();
    expect(browser.getCurrentUrl()).toContain('/report');

    report.fillAddress('My address');
    report.fillDate('01/30/2015');
    report.fillPeriod('Madrugada');
    report.fillPeriod('Roubo');
    report.submitButtonClick();

    expect(browser.getCurrentUrl()).toContain('/confirmation');

    confirmation.backToHome();

    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
