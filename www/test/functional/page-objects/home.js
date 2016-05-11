var fillAddress = function(text) {
  element(by.model('search.text')).clear();
  return element(by.model('search.text')).sendKeys(text);
}

var submitAddressSearch = function() {
  return element(by.buttonText('Buscar')).click();
};

var getList = function() {
  return element.all(by.css('.place-list li'));
}

var Home = function() {

  this.reportRisk = function () {
    return element(by.buttonText('Reportar risco')).click();
  };

  this.searchExistingAddress = function() {
    fillAddress('Dom Pedro');
    submitAddressSearch();
    getList().then(function(items){
      expect(items.length).toBe(5);
    });
  }

  this.searchNonExistentAddress = function() {
    fillAddress('invalidAddress');
    submitAddressSearch();
    getList().then(function(items){
      expect(items[0].getText()).toContain('Nenhum resultado encontrado.');
    });
  }

  this.selectAddress = function() {
    fillAddress('Rua Dom Pedro II, Porto Alegre');
    element(by.buttonText('Buscar')).click();
    getList().then(function(items){
      items[0].click();
      expect(element(by.model('search.text')).getAttribute('value')).toBe('Rua Dom Pedro II - São João, Porto Alegre - RS, Brazil');
    });
  }
};

module.exports = Home;
