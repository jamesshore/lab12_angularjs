// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
(function() {
	"use strict";

	var configurationPanel = require("./ui/configuration_panel.js");
	var stockMarketTable = require("./ui/stock_market_table.js");

	var UserConfiguration = require("./persistence/user_configuration.js");
	var StockMarketProjection = require("./domain/stock_market_projection.js");
	var StockMarketYear = require("./domain/stock_market_year.js");
	var Year = require("./values/year.js");
	var ValidDollars = require("./values/valid_dollars.js");
	var GrowthRate = require("./values/growth_rate.js");
	var TaxRate = require("./values/tax_rate.js");
	var UserEnteredDollars = require("./values/user_entered_dollars.js");

	var helloWorld = angular.module("helloWorld", [configurationPanel.name, stockMarketTable.name]);
	helloWorld.controller("ExampleController", ["$scope", function ($scope) {
		$scope.configuration = new UserConfiguration();
		$scope.projection = projectionFor($scope.configuration);

		$scope.configuration.onChange(function () {
			console.log("update projection");
			$scope.projection = projectionFor($scope.configuration);
		});

		setTimeout(function () {
			$scope.$apply(function () {
				console.log("update configuration");
				$scope.configuration.setStartingBalance(new UserEnteredDollars("55555"));
			});
		}, 2000);
	}]);

	function projectionFor(config) {
		var firstYear = new StockMarketYear(
			UserConfiguration.STARTING_YEAR,
			config.getStartingBalance(),
			config.getStartingCostBasis(),
			UserConfiguration.INTEREST_RATE,
			UserConfiguration.CAPITAL_GAINS_TAX_RATE
		);
		var projection = new StockMarketProjection(
			firstYear,
			UserConfiguration.ENDING_YEAR,
			config.getYearlySpending()
		);
		return projection;
	}
})();
