var Home = require('./page-objects/home.js');

describe('home page', function() {
  var home;

  beforeEach(function () {
    home = new Home();
  });

  it('should not call autocomplete without googleplace tag', function() {
    browser.get('/#/home');
    expect(element(by.model('search.text')).getAttribute('googleplace')).toBe('');
  });
});
