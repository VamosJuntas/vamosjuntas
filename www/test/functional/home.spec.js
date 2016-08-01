var Splash = require('./page-objects/splash.js');
var Home = require('./page-objects/home.js');
var Report = require('./page-objects/report.js');
var Confirmation = require('./page-objects/confirmation');
var PlaceDetails = require('./page-objects/placeDetails');


describe('home page', function() {
    var splash, home, report, confirmation, placeDetails;

    beforeEach(function () {
        splash = new Splash();
        home = new Home();
        report = new Report();
        confirmation = new Confirmation();
        placeDetails = new PlaceDetails();
    });

    /*it('should not call autocomplete without googleplace tag', function() {
        browser.get('/#/home');
        home.googlePlaceTag().isPresent().then(function(v){
            expect(v).toBe(true);
        });
    });*/
});