'use strict';

describe('Controller: AppCtrl', function() {
	beforeEach(module('calculateMyPaycheckApp'));

	var controller, scope;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('appCtrl', {
			$scope: scope
		});
	}));

	it('should set the initial result to 0', function() {
		expect(scope.result).toEqual(0);
	});

	it('should not modify result if rate is NaN', function() {
		scope.result = 15;
		scope.$digest();

		scope.rate = NaN;
		scope.$digest();

		expect(scope.result).toEqual(0);
	});

	it('should not modify result if hours is NaN', function() {
		scope.result = 15;
		scope.$digest();

		scope.hours = NaN;
		scope.$digest();

		expect(scope.result).toEqual(0);
	});

	it('should modify result once rate and hours are properly defined', function() {
		scope.rate = 10;
		scope.hours = 10;
		scope.$digest();

		expect(scope.result).toEqual(100);
	});
});
