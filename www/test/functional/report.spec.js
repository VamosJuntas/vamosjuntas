var moment = require('moment');
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
    var date = moment('2015-02-25T02:30:00').format('MM/DD/YYYY, HH:mm');
    report
      .fillDateWithFormat(date)
      .fillRisk('Roubo');

    expect(report.isSubmitButtonEnabled()).toBe(false);
  });

  it('should not send to confirmation page without date', function() {
    browser.get('/#/report');
    report.fillRisk('Roubo');

    expect(report.isSubmitButtonEnabled()).toBe(false);
  });

  it('should not send to confirmation page without period', function() {
    var date = moment('2015-02-25T02:30:00').format('MM/DD/YYYY, HH:mm');
    browser.get('/#/report');

    element(by.className('address')).sendKeys('My address');
    report
      .fillDateWithFormat(date);

    expect(report.isSubmitButtonEnabled()).toBe(false);
  });

  it('should clean the form when coming back from confirmation page', function() {
    var date = moment('2015-02-25T02:30:00').format('MM/DD/YYYY, HH:mm');
    browser.get('/#/report');
    element(by.className('address')).sendKeys('My address');

    report
      .fillDateWithFormat(date)
      .fillRisk('Roubo');

    expect(report.isSubmitButtonEnabled()).toBe(true);

    report
      .submitButtonClick();
    expect(browser.getCurrentUrl()).toContain('/confirmation');

    browser.navigate().back();
    expect(report.getAddress()).toEqual('');
  });

  it('should not send to confirmation page without risk', function() {
    var date = moment('2015-02-25T02:30:00').format('MM/DD/YYYY, HH:mm');
    browser.get('/#/report');

    report
      .fillAddress('My address')
      .fillDateWithFormat(date);

    expect(report.isSubmitButtonEnabled()).toBe(false);
  });

  it('should go through whole report flow and go back to home', function() {
    var date = moment('2015-02-25T02:30:00').format('MM/DD/YYYY, HH:mm');
    browser.get('/');

    splash
      .confirmTerms()
      .joinApp();
    
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
    expect(element(by.model('report.address')).getAttribute('googleplace')).toBe('');

    report
      .fillAddress('My address')
      .fillDateWithFormat(date)
      .fillRisk('Roubo')
      .submitButtonClick();

    expect(browser.getCurrentUrl()).toContain('/confirmation');
    confirmation.backToHome();
    expect(browser.getCurrentUrl()).toContain('/home');
  });
});
