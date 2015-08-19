angular.module('waitstaffCalc', ['ngMessages'])
	.controller('myCtrl', function ($scope) {
		// why can't I assign scope to a variable
		// var basePrice = $scope.basePrice;
		// var taxRate = $scope.taxRate;

		var defaultEarnings = {
			"tipTotal": 0.00,
			"mealCount": 0,
			"avgTipMeal": 0.00
		};

		var setInitValues = function () {
			// inital values:
			$scope.subtotal = 0.00;
			$scope.tip = 0.00;
			$scope.total = 0.00;
			$scope.earnInfo = angular.copy(defaultEarnings);
		}

		var resetForm = function () {
			$scope.meal = {
				"basePrice": null,
				"taxRate": null,
				"tipPercent": null
			}

		}

		setInitValues();
		
		$scope.submit = function (form) {
			if (form.$valid) {
				// customer charges update
				$scope.subtotal = $scope.meal.basePrice + $scope.meal.basePrice * ($scope.meal.taxRate/100);
				$scope.tip = $scope.meal.basePrice * ($scope.meal.tipPercent/100);
				$scope.total = $scope.subtotal + $scope.tip;

				// my earnings info update
				$scope.earnInfo.tipTotal = $scope.earnInfo.tipTotal + $scope.tip;
				$scope.earnInfo.mealCount ++;
				$scope.earnInfo.avgTipMeal = $scope.earnInfo.tipTotal / $scope.earnInfo.mealCount;

				console.log(defaultEarnings)

				
				// reset the form
				$scope.mealDetails.$setPristine();
				resetForm();
			}
		};

		$scope.cancel = function () {
			resetForm();
		}

		$scope.resetAll = function () {
			$scope.earnInfo = defaultEarnings;
			setInitValues();
		}

	})