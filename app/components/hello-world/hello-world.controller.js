(function() {
	'use strict';

	angular.module("vamosJuntas").controller("helloWorldController", HelloWorldController);
	HelloWorldController.$inject = ["helloWorldFactory"];

	function HelloWorldController(helloWorldFactory) {
		var vm = this;

		vm.message = "Hello World!";
		vm.name;
		vm.age;
		vm.countries = [{name: "Brasil"}, {name: "Argentina"}];
		vm.selectedCountry;
		vm.submit = submit;
		vm.factory = helloWorldFactory.factory; 
		function submit() {
			console.log('Entrou');
			var person = {
				name: vm.name,
				age: vm.age,
				country: vm.selectedCountry
			};
			console.log(vm.factory);

			helloWorldFactory.factory.list.push(person);
		}
	}
})();