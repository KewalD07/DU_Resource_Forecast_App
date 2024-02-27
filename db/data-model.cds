namespace my.resources;

entity Resources {
  key ID             : UUID;
      enterpriseID   : String;
      employeeID     : Integer;
      employeeName   : String;
      location       : String;
      designation    : String;
      level          : Integer;
      leadResourceID : String;
      team           : String;
      toAssignment   : Association to many Assignments
                         on toAssignment.enterpriseID = enterpriseID;
      toDemandItems  : Association to many DemandItems
                         on toDemandItems.resourceEnterpriseID = enterpriseID;
      //hasSelectedSkill         : String;
      status         : String;
}

entity Projects {
  key ID           : UUID;
      project      : String;
      projectType  : String;
      deliveryType : String;
      leadResource : String;
      toAssignment : Association to many Assignments
                       on toAssignment.project = project;
}

entity Assignments {
  key ID               : UUID;
      enterpriseID     : String;
      toResource       : Association to many Resources
                           on toResource.enterpriseID = enterpriseID;
      toProject        : Association to many Projects
                           on toProject.project = project;
      project          : String;
      allocation       : String;
      // leadResourceID  : String;
      startDate        : Date;
      endDate          : Date;
      assignmentStatus : String;
      //latest            : String;
      roleDescription  : String;
}

entity Demands {
  key ID                    : UUID;
      demandID              : String;
      toDemandItems         : Association to many DemandItems
                                on toDemandItems.demandID = demandID;
      project               : String;
      projectType           : String;
      deliveryType          : String;
      requestorEnterpriseID : String;
      requestDate           : Date;
      //demandStatus           : String;
      dealType              : String;
      dealStatus            : String;
      remarks               : String;
}


entity DemandItems {
  key ID                   : UUID;
      demandID             : String;
      toDemand             : Association to one Demands
                               on toDemand.demandID = demandID;
      project              : String;
      demandItem           : Integer;
      startDate            : Date;
      endDate              : Date;
      //requiredSkill         : String;
      requiredLevel        : String;
      resourceSkill        : String;
      resourceLevel        : String;
      resourceEnterpriseID : String;
      toResource           : Association to one Resources
                               on toResource.enterpriseID = resourceEnterpriseID;
      resourceStatus       : String;
}
