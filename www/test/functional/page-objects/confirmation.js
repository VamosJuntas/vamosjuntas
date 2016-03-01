var Confirmation = function () {

  this.backToHome = function () {
    return element(by.buttonText('Voltar para a lista')).click();
  };

};

module.exports = Confirmation;
