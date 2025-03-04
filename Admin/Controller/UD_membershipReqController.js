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
    
            const result = await UD_membershipReqModel.MembershipReqAprrove(id);
            return res.status(200).json({result});
            if (result && result.success) { 
                return res.status(200).json({
                    status: 'success',
                    message: "Membership Request Approved Successfully",
                    redirect: res.Admin('/MembershipReq')
                });
            } else {
                return res.status(400).json({
                    status: 'error',
                    message: "Failed to Approve Membership Request."
                });
            }
        } catch (error) {
            console.error('Error Approving Membership Request:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    

    static async MembershipReqAprrove132(req, res) {
        try {
            const { id } = req.query;
            const RqApprove = await UD_membershipReqModel.MembershipReqAprrove();
            // return res.status(200).json({"msg": RqApprove})
            const result = RqApprove.find(RqApprove => RqApprove.id == id);

            if (result && result.affectedRows > 0) { 
                return res.status(200).json({status:'success',message:"Membership Request Approve Succeffully", redirect:res.Admin('/MembershipReq')});
    
            } else {
             
                return res.status(200).json({status:'error',message:"Failed to Approve Membership Request. No rows were affected.'"});
              
            }
       
        } catch (error) {
            console.error('Error fetching Membership Request:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }




    
    


}
module.exports = UD_membershipReqController;