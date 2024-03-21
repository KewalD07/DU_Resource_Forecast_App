using my.resources as my from '../db/data-model';


service CatalogService @(requires: 'authenticated-user'){
    entity Resource as projection on my.Resources;
    entity Projects as projection on my.Projects;
    entity Assignment as projection on my.Assignments;
    entity Demand as projection on my.Demands;
    // entity Demand_Items as projection on my.Demand_Items;
    entity DemandItems as projection on my.DemandItems;
}


service noauth @(requires: 'any'){
    //function getResourceDashData() returns array of String;
    entity Resource as projection on my.Resources;
    entity Projects as projection on my.Projects;
    entity Assignment as projection on my.Assignments;
    entity Demand as projection on my.Demands;
    // entity Demand_Items as projection on my.Demand_Items;
    entity DemandItems as projection on my.DemandItems;
    entity ResourceDashboard as Select r.enterpriseID ,r.employeeName,r.designation,r.team,r.leadResourceID as StreamLead,a.project,dI.project as PlannedProject,a.allocation, a.assignmentStatus, a.endDate
        from my.Resources as r
        left outer join my.Assignments as a
        on r.enterpriseID = a.enterpriseID
        left outer join  my.DemandItems as dI
         on  r.enterpriseID = dI.resourceEnterpriseID;
}