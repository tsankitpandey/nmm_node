const BaseController=require("./BaseController");

class BusinessNMMController extends BaseController{

    static async ViewIndex(req, res){
        res.render("NMM/Business/ViewIndex", {title: "Business", component_title:'Business Impact', icon:'<i class="bx bx-home-alt"></i>', page_title: 'View Impact' })
    }

    static async TransactionIndex(req, res){
        res.render("NMM/Business/TransactionAdd", {title: "Business", component_title:'Business Impact', icon:'<i class="bx bx-home-alt"></i>', page_title: 'View Impact' })
    }


}
module.exports = BusinessNMMController;