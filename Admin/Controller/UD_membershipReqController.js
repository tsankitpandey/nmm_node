const BaseController=require("./BaseController");
const UD_membershipReqModel=require("../Model/UD_membershipReqModel")
class UD_membershipReqController extends BaseController{

    static async MembershipReqIndex(req, res) {
        try {
            const request = await UD_membershipReqModel.MembershipReqIndex();

            // return res.status(200).json({"msg": request})
            
            res.render("user Directory/membership_request", {
                title: "Email Template List",
                component_title: "Membership Request ",
                icon: '<i class="bx bx-home-alt"></i>',
                page_title: "Membership Request List",
                request,
            });
        } catch (error) {
            console.error("Error in SettingIndex:", error);
            req.flash("error", "An error occurred while fetching the email settings.");
            res.redirect(res.Admin("/MembershipReq"));
        }
    }

    static async MembershipReqDelete (req,res){
        try {
    
            const { id } = req.query;
        //    return res.status(200).json({"msg": id})
            const result = await UD_membershipReqModel.MembershipReqDelete(id);
            if (result && result.affectedRows > 0) { 
                return res.status(200).json({status:'success',message:"Membership Request Deleted Succeffully", redirect:res.Admin('/MembershipReq')});
    
            } else {
             
                return res.status(200).json({status:'error',message:"Failed to delete Membership Request. No rows were affected.'"});
              
            }
        }
         catch (error) {
            console.error('Error in Membership Request:', error);
            return res.status(200).json({status:'error',message:"An error occurred while Deleting Membership Request."});
        }
    }
    

    static async MembershipReqAprrove(req, res) {
        try {
            const { id } = req.query;
    
            const result = await UD_membershipReqModel.MembershipReqApprove(id);
    
            if (result.deleteResult.affectedRows > 0) {
                return res.status(200).json({
                    status: 'success',
                    message: "Membership Request Approved Successfully",
                    redirect: res.Admin('/MembershipReq')
                });
            } else {
                return res.status(200).json({
                    status: 'error',
                    message: "Failed to Approved Membership Request. No rows were affected."
                });
            }
        } catch (error) {
            console.error('Error in Membership Request:', error);
            return res.status(500).json({
                status: 'error',
                message: "An error occurred while Approved Membership Request.",
                details: error
            });
        }
    }

    static async MembershipDateAdd(req,res){
        try {
            const { id } = req.query;
            
            const MemberShipDate = await UD_membershipReqModel.MembershipReqIndex();

            const MemberShipDates = MemberShipDate?.find(MemberShipDate => MemberShipDate.id == id);
         
                res.render("user Directory/MembershipDateAdd", {
                layout: "layout/layout-model",
                title: "MemberShip Date",
                page_title: "MemberShip Date",
                MemberShipDates,
          
            });
       
        } catch (error) {
            console.error('Error fetching News:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    
    static async MembershipDateUpdate(req, res) {
      const data = req.body; 
      const requestId = req.body.RequestId;
      // return res.status(200).json({"msg":req.body})
      try {

          const updateResult = await UD_membershipReqModel.updateMembershipDate(requestId, data);
         
          if (updateResult.affectedRows > 0) {
              req.flash("success", "Membership Date Updated successfully!");
              return res.status(200).redirect(res.Admin('/MembershipReq'));
          } else {
              req.flash("warning", "Failed to Update Membership Date. No rows were affected.");
              return res.status(200).redirect(res.Admin('/MembershipReq'));
          }
      } catch (error) {
          console.error("Error in Membership Date:", error);
          req.flash("error", "An error occurred while updating the Membership Date.");
          return res.status(200).redirect(res.Admin('/MembershipReq'));
      }
    }

    static async MembershipUpgradeIndex(req, res) {
        try {
            const Upgrade = await UD_membershipReqModel.MembershipUpgradeIndex();

            // return res.status(200).json({"msg": Upgrade})
            
            res.render("user Directory/membership_UpgradeReq", {
                title: "Email Template List",
                component_title: "Membership Request ",
                icon: '<i class="bx bx-home-alt"></i>',
                page_title: "Membership Upgrade  Request List",
                Upgrade,
            });
        } catch (error) {
            console.error("Error in SettingIndex:", error);
            req.flash("error", "An error occurred while fetching the email settings.");
            res.redirect(res.Admin("/MembershipUpgradeReq"));
        }
    }

    static async MembershipUpgradeAprrove(req, res) {
        try {
            const { id } = req.query;
    
            const result = await UD_membershipReqModel.MembershipUpgradeAprrove(id);
    
            if (result.deleteResult.affectedRows > 0) {
                return res.status(200).json({
                    status: 'success',
                    message: "Membership Request Approved Successfully",
                    redirect: res.Admin('/MembershipReq')
                });
            } else {
                return res.status(200).json({
                    status: 'error',
                    message: "Failed to Approved Membership Request. No rows were affected."
                });
            }
        } catch (error) {
            console.error('Error in Membership Request:', error);
            return res.status(500).json({
                status: 'error',
                message: "An error occurred while Approved Membership Request.",
                details: error
            });
        }
    }

}
module.exports = UD_membershipReqController;