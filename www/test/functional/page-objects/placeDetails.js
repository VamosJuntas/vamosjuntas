var PlaceDetails = function () {
  this.backButton = function() {
    return element(by.xpath('//*[@id="backBtn"]'));
  };

  this.occurrencesArePresent = function() {
    return element(by.repeater('occurrence in allOccurrences')).isPresent();
  };
};

module.exports = PlaceDetails;
