describe('Report address form', function() {
  it('should not send to confirmation page', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.className("address")).sendKeys("My address");
    element(by.className("date")).sendKeys("01/30/2015");
    element(by.cssContainingText('option', 'Madrugada')).click();
    element(by.buttonText("Enviar")).click();
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/report');
  });

  it('should send to confirmation page', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.className("address")).sendKeys("My address");
    element(by.className("date")).sendKeys("01/30/2015");
    element(by.cssContainingText('option', 'Madrugada')).click();
    element(by.cssContainingText('option', 'Roubo')).click();
    element(by.buttonText("Enviar")).click();
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/confirmation');
  });
});