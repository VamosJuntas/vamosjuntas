(function() {
	'use strict';

	angular.module("vamosJuntas").factory("helloWorldFactory", helloWorldFactory);

	function helloWorldFactory() {
		var helloWorld = {};
		helloWorld.factory = {};
		helloWorld.factory.list = [{name: 'Test'}];
		return helloWorld;
	}

})();