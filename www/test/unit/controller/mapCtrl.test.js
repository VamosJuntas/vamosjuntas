// describe('MapController', function() {

//     var cordovaGeolocation, createController;

//     beforeEach(function() {
//         module('vamosJuntas');

//         inject(function ($rootScope, $controller, $injector, $cordovaGeolocation) {
//             var scope = $injector.get('$rootScope');
//             cordovaGeolocation = $cordovaGeolocation;

//             createController = function() {
//                 $controller('MapController', {
//                     '$scope': scope,
//                     '$state': {},
//                     '$cordovaGeolocation': cordovaGeolocation
//                 });
//                 scope.$root.$digest();
//             };
//         })
//     });

//     it('should get current position', function() {
//         var promise = {then:function(){}};
//     	spyOn(cordovaGeolocation, 'getCurrentPosition').and.returnValue(promise);
//         createController();

//         expect(cordovaGeolocation.getCurrentPosition).toHaveBeenCalled();

//     });
// });
