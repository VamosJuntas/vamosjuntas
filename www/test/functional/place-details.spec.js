var Splash = require('./page-objects/splash.js');
var Home = require('./page-objects/home.js');
var PlaceDetails = require('./page-objects/placeDetails');

describe('Place Details page', function() {
    var splash, home, placeDetails;

    beforeEach(function () {
      splash = new Splash();
      home = new Home();
      placeDetails = new PlaceDetails();
    });

    //test failing due timeout, need investigation
    xit('should be exposing place details', function() {
      browser.get('/#/');
      splash
        .confirmTerms()
        .joinApp();

      home
        .fillSearchText('Av. Ipiranga, Porto Alegre - RS, Brazil')
        .clickSearchButton()
        .clickRiskDetails();

      expect(placeDetails.occurrencesArePresent()).toBe(true);
    });
});
