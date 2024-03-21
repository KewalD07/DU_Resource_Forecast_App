const cds = require('@sap/cds');
 module.exports = cds.service.impl(async function(){
    //Accessing entities from service
    const {Resource,Projects,Assignment,Demand,DemandItems} = this.entities('noauth');
    this.on('getResourceDashData',async()=>{
        try{
        let mainQuery = cds.parse.cql(`Select r.EnterpriseID ,r.EmployeeName,r.Designation,r.Team,r.LeadResourceID as StreamLead,a.Project,dI.Project as PlannedProject,a.allocation
        from ${Resource} as r
        left outer join ${Assignment} as a
        on r.EnterpriseID = a.EnterpriseID
        left outer join  ${DemandItems} as dI
         on  r.EnterpriseID = dI.ResourceEnterpriseID`);
        // let mainQuery = cds.parse.cql(`Select * from ${Resource}`);
        let data = await cds.db.run(mainQuery);
        console.log(data);
        return data;
        }catch(error){
            console.log(error.message);
        }
    });
});
 

// const cds = require('@sap/cds');  
// module.exports = async (srv)=>{
//     //Accessing entities from service
//     const {Resource,Projects,Assignment,Demand,DemandItems} = cds.entities('my.resources');
//     srv.on('getResourceDashData',async(req)=>{
//         try{
//         let mainQuery = cds.parse.cql(`Select r.EnterpriseID ,r.EmployeeName,r.Designation,r.Team,r.LeadResourceID as StreamLead,a.Project,dI.Project as PlannedProject,a.allocation
//         from ${Resource} as r
//         left outer join ${Assignment} as a
//         on r.EnterpriseID = a.EnterpriseID
//         left outer join  ${DemandItems} as dI
//          on  r.EnterpriseID = dI.ResourceEnterpriseID`);
//         let data = await cds.db.run(mainQuery);
//         console.log(data);
//         return data;
//         }catch(error){
//            // req.error(500,error.message);
//             console.log(error);
//         }
//     });
// };
 