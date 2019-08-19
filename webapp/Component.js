sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/hcl/hclBOT/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.hcl.hclBOT.Component", {

		metadata: {
			manifest: "json"
		},
		createContent: function () {
			var oViewData = {
				component: this
			};
			var oView = sap.ui.view({
				viewName: "com.hcl.hclBOT.view.chatBOT",
				type: sap.ui.core.mvc.ViewType.XML,
				viewData: oViewData
			});

			return (oView);
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});