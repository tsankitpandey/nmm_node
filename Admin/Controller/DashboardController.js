const BaseController=require("./BaseController");

class DashboardController extends BaseController{
    static async index(req,res){

        res.render("index", { title: "Events", component_title:' component',icon:'<i class="bx bx-home-alt"></i>',page_title: 'One2one Events' })
    
    }

}
module.exports = DashboardController; 