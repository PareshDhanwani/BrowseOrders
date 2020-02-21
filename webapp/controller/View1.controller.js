sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter"
], function (Controller, MessageToast,Filter) {
	"use strict";

	return Controller.extend("browseorders.BrowseOrders.controller.View1", {
		onInit: function () {

		},
		onBeforeRendering: function () {
			this.data = this.getView().getModel().getData();
			var count = this.data.orders.length;
			this.getView().byId("masterTitle").setTitle("Orders (" + count + ")");

		},
		onListItemPress: function (oEvent) {
			var str = oEvent.getSource().getBindingContext().getPath();
			this.getView().byId("dp").bindElement(oEvent.getSource().getBindingContext().getPath());
			this.getView().byId("dp").setVisible(true);
			var matches = str.match(/(\d+)/);
			var count = this.data.orders[parseInt(matches[1])].products.length;
			var total = 0;
			for (var i = 0; i < count; i++) {
				total = total + this.data.orders[parseInt(matches[1])].products[i].price * this.data.orders[parseInt(matches[1])].products[i].quantity;
			}
			this.getView().byId("detailPage").setNumber(total);
			//this.getView().byId("detailPage").bindProperty("number",{type:"sap.ui.model.type.Currency"});
			this.getView().byId("tableTitle").setText("Line Items ("+count+")");
		},
		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("orderid", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
				
			}

			// update list binding
			var list = this.byId("idList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		}
	});
});