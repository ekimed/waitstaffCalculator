angular.module('waitstaffCalc', ['ngMessages', 'ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl'
		})
		.when('/new-meal', {
			templateUrl: 'newMeal.html',
			controller: 'NewMealCtrl'
		})
		.when('/my-earnings', {
			templateUrl: 'myEarnings.html',
			controller: 'MyEarningsCtrl'
		});
	}])
	.run(function ($rootScope) {
		var defaultEarnings = {
			"tipTotal": 0.00,
			"mealCount": 0,
			"avgTipMeal": 0.00
		};

		// initial values
		$rootScope.earnInfo = angular.copy(defaultEarnings);
		$rootScope.defaultEarnings = defaultEarnings;
	})
	.controller('myCtrl', function ($scope) {
		// nothing here yet...
	})
	.controller('NewMealCtrl', function ($scope, $rootScope) {
		var setInitValues = function () {
			// inital values:
			$scope.subtotal = 0.00;
			$scope.tip = 0.00;
			$scope.total = 0.00;
			
		};

		var resetForm = function () {
			$scope.meal = {
				"basePrice": null,
				"taxRate": null,
				"tipPercent": null
			}

		};

		setInitValues();
		
		$scope.submit = function (form) {
			if (form.$valid) {
				// customer charges update
				$scope.subtotal = $scope.meal.basePrice + $scope.meal.basePrice * ($scope.meal.taxRate/100);
				$scope.tip = $scope.meal.basePrice * ($scope.meal.tipPercent/100);
				$scope.total = $scope.subtotal + $scope.tip;

				// my earnings update
				$rootScope.earnInfo.tipTotal = $rootScope.earnInfo.tipTotal + $scope.tip;
				$rootScope.earnInfo.mealCount++;
				$rootScope.earnInfo.avgTipMeal = $rootScope.earnInfo.tipTotal / $rootScope.earnInfo.mealCount;

				// reset the form
				$scope.mealDetails.$setPristine();
				resetForm();
			}
		};

		$scope.cancel = function () {
			resetForm();
		};
	})
	.controller('MyEarningsCtrl', function ($scope, $rootScope) {
		

		// my earnings info update
		// $scope.earnInfo.tipTotal = $scope.earnInfo.tipTotal + $scope.tip;
		// $scope.earnInfo.mealCount ++;
		// $scope.earnInfo.avgTipMeal = $scope.earnInfo.tipTotal / $scope.earnInfo.mealCount;

		$scope.resetAll = function () {
			$rootScope.earnInfo = $rootScope.defaultEarnings;
		};
	});