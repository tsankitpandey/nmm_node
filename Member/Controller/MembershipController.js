const BaseController = require("./BaseController");
const MembershipModel=require("../Model/MembershipModel")

class MembershipController extends BaseController{

   static async MembershipPlan(req,res,next){
    const {company_id}= req.body;

    try{
      const result= await MembershipModel.MembershipPlan(company_id);
      if(result.length>0){
        res.status(200).json({status:'success',data:result});
      }

    }catch(err){
       next(err);
    }
    
   }

  static async UpgradePlan(req,res,next){
    const {company_id,membership_id,userID}= req.body;

    try{

      const data= await MembershipModel.UpgradePlanRequest(company_id);
      if(data.length>0){
        res.status(200).json({status:'error',msz:'You have already made a request '});
      }else{
        const result= await MembershipModel.UpgradePlan(company_id,membership_id,userID);

        if(result.affectedRows>0){
          res.status(200).json({status:'success',msz:'Your request has been submitted. '});
        }
      }

     

    }catch(err){
       next(err);
    }
    
  }

 

}
module.exports= MembershipController;