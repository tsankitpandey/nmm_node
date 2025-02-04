const BaseController=require("./BaseController");

class PlanNMMController extends BaseController{

    static async PlanIndex(req,res){

        res.render("NMM/Membership/planList", {title: "Membership", component_title:'Membership', icon:'<i class="bx bx-home-alt"></i>',page_title: 'Plan List'})
    }

    static async PlanAdd(req,res){
        res.render("NMM/Membership/PlanAdd", { layout: "layout/layout-model" })
    }
}  
module.exports = PlanNMMController;