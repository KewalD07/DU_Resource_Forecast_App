//@ui5-bundle atciduforecastui/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"atciduforecastui/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","atciduforecastui/model/models"],function(e,t,i){"use strict";return e.extend("atciduforecastui.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"atciduforecastui/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(n){"use strict";return n.extend("atciduforecastui.controller.App",{onInit:function(){}})});
},
	"atciduforecastui/controller/Main.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("atciduforecastui.controller.Main",{onInit:async function(){const e=await $.get(this.getOwnerComponent().getModel().sServiceUrl+"/ResourceDashboard");if(e){this.getOwnerComponent().getModel("localD").setProperty("/ResourceDashboard",e?.value)}this.setFilterMessage("Displaying Information of All Resources")},onRecordFilterChange:function(e){var t=e.getParameter("selectedItem").getKey();var i=this.getView().byId("resourceTable");var s=i.getBinding("items");var r;var n="";if(t==="All"){s.filter([]);n="Displaying Information of All Resources"}else if(t==="HittingDownTime"){this.onFilterChange();n="Displaying Information of Resources nearing Down Time"}else{if(t==="NotAssigned"){r=new sap.ui.model.Filter("assignmentStatus",sap.ui.model.FilterOperator.EQ,null);n="Displaying Information of Resources with Assignment status as Not Assigned"}else{r=new sap.ui.model.Filter("assignmentStatus",sap.ui.model.FilterOperator.EQ,t);n="Displaying Information of Resources with Assignment status as "+t}s.filter(r)}this.setFilterMessage(n)},onFilterChange:function(){var e=this.getOwnerComponent().getModel("localD").getProperty("/ResourceDashboard");var t=this.getView().byId("resourceTable");var i=t.getBinding("items");var s=new Date;var r=[];e.forEach(function(e){var t=new Date(e.endDate);var i=t.getTime()-s.getTime();var n=Math.floor(i/(1e3*60*60*24));if(n<=15){r.push(new sap.ui.model.Filter("enterpriseID",sap.ui.model.FilterOperator.EQ,e.enterpriseID))}});t.getBinding("items").aFilters=[];i.filter(r)},setFilterMessage:function(e){var t=this.getView().byId("_IDGenMessageStrip1");if(t){t.setText(e)}}})});
},
	"atciduforecastui/i18n/i18n.properties":'# This is the resource bundle for atciduforecastui\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=ATCI DU Forecast UI\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n#XTIT: Main view title\ntitle=ATCI DU Forecast UI\n\nflpTitle=ATCI DU Forecast\n',
	"atciduforecastui/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"atciduforecastui","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.12.4","toolsId":"e9c14b0f-41c3-4590-a0d2-388bc9d69c3e"},"dataSources":{"mainService":{"uri":"Demo_Apps_destination_srv/odata/v4/noauth/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"duforecast-display":{"semanticObject":"duforecast","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.120.8","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"atciduforecastui.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"localD":{"type":"sap.ui.model.json.JSONModel"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"atciduforecastui.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteMain","pattern":":?query:","target":["TargetMain"]}],"targets":{"TargetMain":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Main","viewName":"Main"}}},"rootView":{"viewName":"atciduforecastui.view.App","type":"XML","async":true,"id":"App"}}}',
	"atciduforecastui/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"atciduforecastui/view/App.view.xml":'<mvc:View controllerName="atciduforecastui.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"atciduforecastui/view/Main.view.xml":'<mvc:View\n  xmlns:cards="sap.f.cards"\n  xmlns:mvc="sap.ui.core.mvc"\n  xmlns="sap.m"\n  xmlns:core="sap.ui.core" controllerName="atciduforecastui.controller.Main" displayBlock="true"><Page id="page" title="{i18n>title}"><content><Title id="_IDGenTitle1" text="Resource Dashboard" level="H2"/><Table id="resourceTable" items="{/ResourceDashboard}"><headerToolbar><OverflowToolbar id="_IDGenOverflowToolbar1"><ToolbarSpacer id="_IDGenToolbarSpacer1" /><Label id="_IDGenLabel1" text="Filter Records:"/><Select id="recordFilter" change="onRecordFilterChange"><core:Item id="_IDGenItem1" key="All" text="All"/><core:Item id="_IDGenItem2" key="Active" text="Active"/><core:Item id="_IDGenItem3" key="Completed" text="Completed"/><core:Item id="_IDGenItem4" key="Inprogress" text="In Progress"/><core:Item id="_IDGenItem5" key="NotAssigned" text="Not Assigned"/><core:Item id="_IDGenItem6" key="HittingDownTime" text="Hitting Down Time"/></Select><MessageStrip id="_IDGenMessageStrip1"\n              text=""\n              showIcon="true"\n              showCloseButton="true"></MessageStrip></OverflowToolbar></headerToolbar><columns><Column id="_IDGenColumn1"><Label id="_IDGenLabel2" text="Enterprise ID"/></Column><Column id="_IDGenColumn2"><Label id="_IDGenLabel3" text="Employee Name"/></Column><Column id="_IDGenColumn3"><Label id="_IDGenLabel4" text="Designation"/></Column><Column id="_IDGenColumn4"><Label id="_IDGenLabel5" text="Team"/></Column><Column id="_IDGenColumn5"><Label id="_IDGenLabel6" text="Stream Lead"/></Column><Column id="_IDGenColumn6"><Label id="_IDGenLabel7" text="Current Project"/></Column><Column id="_IDGenColumn7"><Label id="_IDGenLabel8" text="Planned Project"/></Column><Column id="_IDGenColumn8"><Label id="_IDGenLabel9" text="Assignment Status"/></Column><Column id="_IDGenColumn9"><Label id="_IDGenLabel10" text="Current Allocation %"/></Column><Column id="_IDGenColumn10"><Label id="_IDGenLabel11" text="End Date"/></Column></columns><items><ColumnListItem id="_IDGenColumnListItem1"><Text id="_IDGenText1" text="{enterpriseID}"/><Text id="_IDGenText2" text="{employeeName}"/><Text id="_IDGenText3" text="{designation}"/><Text id="_IDGenText4" text="{team}"/><Text id="_IDGenText5" text="{StreamLead}"/><Text id="_IDGenText6" text="{= ${project} || \'--\'}" /><Text id="_IDGenText7" text="{= ${PlannedProject} || \'--\'}" /><Text id="_IDGenText8" text="{= ${assignmentStatus} || \'Not Assigned\'}" /><Text id="_IDGenText9" text="{= ${allocation} || \'--\'}" /><Text id="_IDGenText10"  text="{= ${endDate} || \'--\'}" /></ColumnListItem></items></Table></content></Page></mvc:View>'
}});
