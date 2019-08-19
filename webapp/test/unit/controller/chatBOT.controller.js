/*global QUnit*/

sap.ui.define([
	"com/hcl/hclBOT/controller/chatBOT.controller"
], function (Controller) {
	"use strict";

	QUnit.module("chatBOT Controller");

	QUnit.test("I should test the chatBOT controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});