describe('Report address form', function() {
  it('should not send to confirmation page without address', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.className('date')).sendKeys('01/30/2015');
    element(by.cssContainingText('option', 'Madrugada')).click();
    element(by.cssContainingText('option', 'Roubo')).click();
    expect(element(by.buttonText('Enviar')).isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without date', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.className('address')).sendKeys('My address');
    element(by.cssContainingText('option', 'Madrugada')).click();
    element(by.cssContainingText('option', 'Roubo')).click();
    expect(element(by.buttonText('Enviar')).isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without period', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.className('address')).sendKeys('My address');
    element(by.className('date')).sendKeys('01/30/2015');
    element(by.cssContainingText('option', 'Roubo')).click();
    expect(element(by.buttonText('Enviar')).isEnabled()).toBe(false);
  });

  it('should not send to confirmation page without risk', function() {
    browser.get('http://localhost:8100/#/report');

    element(by.className('address')).sendKeys('My address');
    element(by.className('date')).sendKeys('01/30/2015');
    element(by.cssContainingText('option', 'Madrugada')).click();
    expect(element(by.buttonText('Enviar')).isEnabled()).toBe(false);
  });

  it('should go through whole report flow and go back to home', function() {
    browser.get('http://localhost:8100/');

    element(by.css('#check-terms')).click();
    element(by.css('button')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/home');

    element(by.buttonText('Reportar risco')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/report');

    element(by.className('address')).sendKeys('My address');
    element(by.className('date')).sendKeys('01/30/2015');
    element(by.cssContainingText('option', 'Madrugada')).click();
    element(by.cssContainingText('option', 'Roubo')).click();
    element(by.buttonText('Enviar')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/confirmation');

    element(by.buttonText('Voltar para a lista')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/home');
  });
});
