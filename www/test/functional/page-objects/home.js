var Home = function() {

  this.reportRisk = function () {
    return element(by.buttonText('Reportar risco')).click();
  };

};

module.exports = Home;
