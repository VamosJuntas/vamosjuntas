var fillAddress = function(text) {
	element(by.model('searchText')).clear();
	return element(by.model('searchText')).sendKeys(text);
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

  this.fillExistingAddress = function() {
  	fillAddress('Dom Pedro');
    submitAddressSearch();
    getList().then(function(items){
      expect(items.length).toBe(5);
    });
  }

  this.fillNonExistentAddress = function() {
  	fillAddress('invalidAddress');
    submitAddressSearch();
    getList().then(function(items){
      expect(items[0].getText()).toContain('Nenhum resultado encontrado.');
    });
  }
};

module.exports = Home;
