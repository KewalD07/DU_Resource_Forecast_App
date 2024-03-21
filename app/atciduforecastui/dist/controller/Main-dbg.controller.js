sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("atciduforecastui.controller.Main", {
            onInit: function () {
                this.setFilterMessage("Displaying Information of All Resources");
              //  this.onReadData();
                
            },
            onRecordFilterChange: function(oEvent) {
                var sSelectedStatus = oEvent.getParameter("selectedItem").getKey();
                var oTable = this.getView().byId("resourceTable");
                var oBinding = oTable.getBinding("items");
                var oFilter;
                var sMessage = "";
                
                if (sSelectedStatus === "All") {
                    oBinding.filter([]);
                    sMessage = "Displaying Information of All Resources";
                }
                else if (sSelectedStatus === "HittingDownTime") {
                    this.onFilterChange();
                    sMessage = "Displaying Information of Resources nearing Down Time";
                }
                 else {
                    
                    if (sSelectedStatus === "NotAssigned") {
                        oFilter = new sap.ui.model.Filter("assignmentStatus", sap.ui.model.FilterOperator.EQ, null);
                        sMessage = "Displaying Information of Resources with Assignment status as Not Assigned";
                    } else {
                        oFilter = new sap.ui.model.Filter("assignmentStatus", sap.ui.model.FilterOperator.EQ, sSelectedStatus);
                        sMessage = "Displaying Information of Resources with Assignment status as " + sSelectedStatus;
                    }
                    oBinding.filter(oFilter);
                }
                // Set the message in the MessageStrip
                this.setFilterMessage(sMessage);
            },
            onFilterChange: function() {
                var oTable = this.getView().byId("resourceTable");
                var oBinding = oTable.getBinding("items");
                var currentDate = new Date();
                var aFilters = [];
            
                // Iterate through each item in the ResourceDashboard collection
                oTable.getItems().forEach(function (oItem) {
                    var oContext = oItem.getBindingContext();
                    var oResource = oContext.getObject();
                    var endDate = new Date(oResource.endDate);
                    
                    // Calculate the difference in milliseconds
                    var timeDifference = endDate.getTime() - currentDate.getTime();
                    
                    // Convert milliseconds to days
                    var differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    
                    // If the difference is less than or equal to 15 days, add the item to the filter
                    if (differenceInDays <= 15) {
                        aFilters.push(new sap.ui.model.Filter("enterpriseID", sap.ui.model.FilterOperator.EQ, oResource.enterpriseID));
                    }
                });
            
                // Apply the filter
                oBinding.filter(aFilters);
            },
            setFilterMessage: function(sMessage) {
                var oMessageStrip = this.getView().byId("_IDGenMessageStrip1");
                if (oMessageStrip) {
                    oMessageStrip.setText(sMessage);
                }
            }
                
        /* if (sSelectedStatus === "All") {
                    oBinding.filter([]);
                } else {
                    oBinding.filter(new sap.ui.model.Filter("allocation", sap.ui.model.FilterOperator.EQ, sSelectedStatus));
            }*/
            
          /*  onReadData:function(){
                var oModel = this.getOwnerComponent().getModel();
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oModel.read("/Resource", {
                    success : function(response){
                        console.log("Response",response );
                        oJSONModel.setData(response.results);
                        this.getView().setModel(oJSONModel,"ResourceDataModel");

                    }.bind(this),
                    error : function(error){
                        console.log("Error",error );
                    }
                })
            }*/
        });
    });
