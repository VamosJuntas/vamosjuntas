var PlaceDetails = function () {
  this.backButton = function() {
    return element(by.xpath('//*[@id="backBtn"]'));
  };
};

module.exports = PlaceDetails;
