sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ui5.tableedit.controller.MainView", {
      onInit: function () {
        this.getView().setModel(
          new JSONModel({ instantSave: true }),
          "viewData",
        );
      },
      onAfterRendering: function () {
        // set editmode false on startup
        const smartTable = this.byId("smartTable");
        smartTable.setEditable(true);
      },
      onFieldChange: function (evt) {
        const table = this.getView().byId(
          "container-ui5.tableedit---MainView--smartTable_ResponsiveTable",
        );
        const viewData = this.getView().getModel("viewData").getData();
        var change = evt.getParameter("changeEvent");
        const changedField = change.getSource();

        const handleSuccess = (response) => {
          // Check if __batchResponses is defined and has at least one element
          if (
            response.__batchResponses &&
            response.__batchResponses.length > 0
          ) {
            const firstResponse = response.__batchResponses[0];

            // Check if the response exists and has a statusCode property
            if (
              firstResponse.response &&
              firstResponse.response.statusCode >= 400
            ) {
              const responseBodyRaw = firstResponse.response.body;
              try {
                const responseBodyParsed = JSON.parse(responseBodyRaw);
                if (
                  responseBodyParsed.error &&
                  responseBodyParsed.error.message
                ) {
                  const errorMessage = responseBodyParsed.error.message.value;
                  changedField.setValueStateText(errorMessage);
                  changedField.setValueState("Error");
                }
              } catch (e) {
                console.error("Error parsing response body:", e);
              }
              table.setBusy(false);
              return; // Exit the function after handling the error
            }
          }

          console.log("success");
        };

        if (change && viewData.instantSave) {
          try {
            change
              .getSource()
              .getModel()
              .submitChanges({
                success: handleSuccess,
                error: function (error) {
                  console.log("error");
                },
              });
          } catch (error) {
            console.log(error);
          }
        }
      },
      saveAll: function () {
        this.byId("smartTable").getModel().submitChanges();
        this.byId("smartTable").setEditable(false);
      },
      resetAll: function () {
        this.byId("smartTable").getModel().resetChanges();
      },
    });
  },
);
