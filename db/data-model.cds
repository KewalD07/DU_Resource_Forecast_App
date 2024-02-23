namespace my.resources;

entity Resources {
  key ID               : UUID;
      Enterprise_ID    : String;
      Employee_ID      : String;
      Employee_Name    : String;
      Location         : String;
      Designation      : String;
      Level            : String;
      Lead_Resource_ID : String;
      Team             : String;
      To_assignment : Association to many Assignment on To_assignment.Enterprise_ID=Enterprise_ID;
      To_demand_items : Association to many Demand_Items on To_demand_items.Resource_Enterprise_ID=Enterprise_ID;
      //Has_Selected_Skill         : String;
      Status           : String;
}

entity Projects {
  key ID            : UUID;
      Project       : String;
      Project_Type  : String;
      Delivery_Type : String;
      Lead_Resource : String;
      To_assignment : Association to many Assignment on To_assignment.Project = Project;
}

entity Assignment {
  key ID                : UUID;
      Enterprise_ID     : String;
      To_resource     : Association to many Resources on To_resource.Enterprise_ID = Enterprise_ID;
      To_project     : Association to many Projects on To_project.Project = Project;
      Project           : String;
      Allocation        : String;
      // Lead_Resource_ID  : String;
      Start_Date        : String;
      End_Date          : String;
      Assignment_Status : String;
      //Latest            : String;
      Role_Description  : String;
}

entity Demand {
  key ID                      : UUID;
      Demand_ID               : String;
      To_demand_items : Association to many Demand_Items on To_demand_items.Demand_ID=Demand_ID;
      Project                 : String;
      Project_Type            : String;
      Delivery_Type           : String;
      Requestor_Enterprise_ID : String;
      Request_Date            : String;
      //Demand_Status           : String;
      Deal_Type               : String;
      Deal_Status             : String;
      Remarks                 : String;
}


entity Demand_Items {
  key ID                     : UUID;
      Demand_ID              : String;
      To_demand : Association to one Demand on To_demand.Demand_ID=Demand_ID;
      Project                : String;
      Demand_Item            : String;
      Start_Date             : String;
      End_Date               : String;
      //Required_Skill         : String;
      Required_Level         : String;
      Resource_Skill         : String;
      Resource_Level         : String;
      Resource_Enterprise_ID : String;
      To_resource : Association to one Resources on To_resource.Enterprise_ID=Resource_Enterprise_ID;
      Resource_Status        : String;
}