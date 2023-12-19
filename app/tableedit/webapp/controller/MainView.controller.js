sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("ui5.tableedit.controller.MainView", {
            onInit: function () {
                this.getView().setModel(new JSONModel({instantSave: false}), "viewData");

            },
            onAfterRendering: function() {
                // set editmode false on startup
                const smartTable = this.byId("smartTable");
                smartTable.setEditable(false);
            },
            onFieldChange: function(evt) {
                const viewData = this.getView().getModel("viewData").getData();
                var change = evt.getParameter("changeEvent");
                if (change && viewData.instantSave) {
                  change.getSource().getModel().submitChanges()
                }
              },
              saveAll: function() {
                this.byId("smartTable").getModel().submitChanges()
                this.byId("smartTable").setEditable(false);
              },
              resetAll: function() {
                this.byId("smartTable").getModel().resetChanges()
              },
        });
    });
