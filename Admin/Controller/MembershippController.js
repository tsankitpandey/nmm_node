const BaseController = require("./BaseController");
const MembershipModel = require("../Model/MembershipModel");

class MembershipController extends BaseController {

  static async MembershipEdit(req, res) {
    const id = req.params.id;

    try {
      const Membership = await MembershipModel.MembershipGet();

      const selectedMembership = Membership.data.find(
        (Membership) => Membership.id === parseInt(id, 10)
      );
      if (selectedMembership) {
        res.render("NMM/Membership/planListEdit", {
          layout: "layout/layout-model",
          selectedMembership,
        });
      } else {
        res.send('Feed not found');

      }
    } catch (error) {

        console.error('Membership data is not an array!');
        res.send('Error: Membership data is not available or not an array.');
    }
  }
  static async Membershipinsert(req, res) {
    const data = req.body;
    // return res.status(200).json({data});

    try {
      const result = await MembershipModel.PlanInsert(data);

      if (result && result.result.affectedRows > 0) {
        req.flash("success", "Membership plan inserted successfully!");

        return res.status(200).redirect(res.Admin("/PlanList"));
      } else {
        req.flash(
          "error",
          "Failed to insert Membership plan. No rows were affected."
        );
        return res.status(200).redirect(res.Admin("/PlanList"));
      }
    } catch (error) {
      console.error("Error in Membership plan:", error.message);
      req.flash("error", "An error occurred while saving the Membership plan.");
      return res.status(200).redirect(res.Admin("/PlanList"));
    }
  }

  static async MembershipGet(req, res) {
    try {
      const Membership = await MembershipModel.MembershipGet();

      if (Membership) {
        res.render("NMM/Membership/planList", {
          title: "Membership",
          component_title: "Membership",
          icon: '<i class="bx bx-home-alt"></i>',
          page_title: "Plan List",
          Membership,
        });
      }
    } catch (error) {}
  }

  static async MembershipUpdate(req, res) {
    const data = req.body;
   const  membershipId = req.params.id;
    // return res.status(200).json({data});

    try {
      const result = await MembershipModel.MembershipUpdate(data, membershipId);
      
      if (result && result.result.affectedRows > 0) {
        req.flash("success", "Membership plan Update successfully!");

        return res.status(200).redirect(res.Admin("/PlanList"));
      } else {
        req.flash(
          "error",
          "Failed to Update Membership plan. No rows were affected."
        );
        return res.status(200).redirect(res.Admin("/PlanList"));
      }
    } catch (error) {
      console.error("Error in Membership plan:", error.message);
      req.flash("error", "An error occurred while Update the Membership plan.");
      return res.status(200).redirect(res.Admin("/PlanList"));
    }
  }

  static async MembershipDelete(req,res){
    const planId=req.params.id;
    // return res.status(200).json({planId})

    try{
   const result = await MembershipModel.MembershipDelete(planId);
  //  return res.status(200).json({result})
    
   if(result){
    req.flash("success", "Membership plan Deleted successfully!");

    return res.status(200).redirect(res.Admin("/PlanList"));
   }
   else{
    req.flash("error", "error in deleting membership plan");

    return res.status(200).redirect(res.Admin("/PlanList"));
   }

    }
    catch(error){
      console.log(error,"error");
      req.flash("error", "error in deleting membership plan");

      return res.status(200).redirect(res.Admin("/PlanList"));
    }
  }
}

module.exports = MembershipController;
