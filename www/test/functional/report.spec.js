var Splash = require('./page-objects/splash.js');
var Home = require('./page-objects/home.js');
var Report = require('./page-objects/report.js');
var Confirmation = require('./page-objects/confirmation');
var PlaceDetails = require('./page-objects/placeDetails');


describe('Report address form', function() {
  var splash, home, report, confirmation, placeDetails;

  beforeEach(function() {
    splash = new Splash();
    home = new Home();
    report = new Report();
    confirmation = new Confirmation();
    placeDetails = new PlaceDetails();

  });

  it('should not send to confirmation page without address', function() {
    browser.get('/#/report');

    var date = new Date(2015, 1, 30, 2, 0);
    report.fillDate(date);

    report.fillRisk('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without date', function() {
    browser.get('/#/report');
    report.fillRisk('Roubo');
    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without period', function() {
    browser.get('/#/report');
    element(by.className('address')).sendKeys('My address');

    var date = new Date(2015, 1, 30, 2, 0);
    report.fillDate(date);

    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without risk', function() {
    browser.get('/#/report');

    report.fillAddress('My address');

    var date = new Date(2015, 1, 30, 2, 0);
    report.fillDate(date);

    expect(report.submitButton().isEnabled()).toBe(false);
  });

  it('should go through whole report flow and go back to home', function() {
    browser.get('/');

    splash.confirmTerms();
    splash.joinApp();
    expect(browser.getCurrentUrl()).toContain('/home');

    browser.wait(function() {
      var deferred = protractor.promise.defer();
      var q = element(by.css('.loading-container.visible.active')).isPresent();

      q.then( function (isPresent) {
        deferred.fulfill(!isPresent);
      });

      return deferred.promise;

    }, 10000);

    home.reportRisk();
    expect(browser.getCurrentUrl()).toContain('/report');

    report.fillAddress('My address');

    var date = new Date(2015, 1, 30, 2, 0);
    report.fillDate(date);

    report.fillRisk('Roubo');

    report.submitButtonClick();

    expect(browser.getCurrentUrl()).toContain('/confirmation');

    confirmation.backToHome();

    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
