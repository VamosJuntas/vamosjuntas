var PlaceDetails = function () {
  this.backButton = function() {
    return element(by.xpath('//*[@id="backBtn"]'));
  };

  this.occurrencesArePresent = function() {
    return element(by.repeater('report in allOccurrencesReports')).isPresent();
  };
};

module.exports = PlaceDetails;
