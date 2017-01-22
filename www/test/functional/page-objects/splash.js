var Splash = function () {

  this.confirmTerms = function() {
    element(by.id('check-terms')).click();
    return this;
  };

  this.joinApp = function() {
    element(by.id('joinBtn')).click();
    return this;
  };

};

module.exports = Splash;
