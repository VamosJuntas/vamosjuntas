var Home = function() {

  this.reportRisk = function () {
    return element(by.buttonText('Reportar risco')).click();
  };

  this.getPlace = function(index) {
     return element(by.repeater('place in places').row(index));
  };
};

module.exports = Home;
