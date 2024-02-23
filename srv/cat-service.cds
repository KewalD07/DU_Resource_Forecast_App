using my.resources as my from '../db/data-model';

service CatalogService @(requires: 'authenticated-user'){
    entity Resource as projection on my.Resources;
    entity Projects as projection on my.Projects;
    entity Assignment as projection on my.Assignment;
    entity Demand as projection on my.Demand;
    entity Demand_Items as projection on my.Demand_Items;
}


service noauth @(requires: 'any'){
    entity Resource as projection on my.Resources;
    entity Projects as projection on my.Projects;
    entity Assignment as projection on my.Assignment;
    entity Demand as projection on my.Demand;
    entity Demand_Items as projection on my.Demand_Items;
}