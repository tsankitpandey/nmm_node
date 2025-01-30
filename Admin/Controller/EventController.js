const BaseController=require("./BaseController");

class EventController extends BaseController{

    static async sponsorIndex(req,res){

        res.render("Events/sponsorIndex", { title: "Events", component_title:' component',icon:'<i class="bx bx-home-alt"></i>',page_title: 'sponsorIndex' })
    }

    static async sponserAdd(req,res){
        res.render("Events/sponserAdd", { layout: "layout/layout-model" })
    }
}
module.exports = EventController;