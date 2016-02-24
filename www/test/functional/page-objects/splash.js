var Splash = function () {

    this.confirmTerms = function() {
          element(by.id('check-terms')).click();
    };

    this.joinApp = function() {
      element(by.id('joinBtn')).click();
    }

};

module.exports = Splash;
