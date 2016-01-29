describe('Report address form', function() {
  it('should send to confirmation page', function() {
    browser.get('http://localhost:8100/#/report');
    element(by.buttonText("Enviar")).click();
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8100/#/confirmation');
  });
});