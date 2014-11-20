// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var configurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ConfigurationField", function() {

	var $compile;
	var $rootScope;
	var parentScope;

	beforeEach(angular.mock.module(configurationField.name));

	beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		parentScope = $rootScope.$new();
	}));

	it("defaults to an initial value", function() {
		var element = createField(new UserEnteredDollars("123"));
		var inputField = element.find("input");

		expect(inputField.val()).to.be("123");
		expect(inputField.hasClass("invalid")).to.be(false);
		expect(inputField.attr("title")).to.be("");
	});

	it("renders invalid values with a warning icon", function() {
		var element = createField(new UserEnteredDollars("xxx"));
		var inputField = element.find("input");

		expect(inputField.val()).to.be("xxx");
		expect(inputField.hasClass("invalid")).to.be(true);
		expect(inputField.attr("title")).to.be("Invalid dollar amount");
	});

	it("changes rendering when user input changes", function() {
		var element = createField(new UserEnteredDollars("123"));
		var inputField = element.find("input");

		element.isolateScope().renderedText = "xxx";
		$rootScope.$digest();

		expect(inputField.hasClass("invalid")).to.be(true);
	});

	it("changes field when input changes", function() {

	}); // TODO


	function createField(userEnteredDollars) {
		parentScope.initialValue = userEnteredDollars;

		var html = "<configuration-field value='initialValue'>Title:</configuration-field>";
		var element = $compile(html)(parentScope);
		$rootScope.$digest();
		return element;
	}

});