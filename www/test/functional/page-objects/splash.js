var Splash = function () {

  this.confirmTerms = function() {
    return element(by.id('check-terms')).click();
  };

  this.joinApp = function() {
    return element(by.id('joinBtn')).click();
  };

};

module.exports = Splash;
