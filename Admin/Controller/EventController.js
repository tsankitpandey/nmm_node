const BaseController=require("./BaseController");

class EventController extends BaseController{
    
    static async EventInfoIndex(req,res){

        res.render("Events/eventInfo", { title: "Events", component_title:'Event',icon:'<i class="bx bx-home-alt"></i>',page_title: 'Event Information' })
    }
    static async sponsorIndex(req,res){

        res.render("Events/sponsorIndex", { title: "Events", component_title:'Event',icon:'<i class="bx bx-home-alt"></i>',page_title: 'Sponsor Index' })
    }

    static async sponserAdd(req,res){
        res.render("Events/sponserAdd", { layout: "layout/layout-model" })
    }
    
    static async EventOrgIndex(req,res){

        res.render("Events/EventOrganizerIndex", { title: "Events", component_title:'Event',icon:'<i class="bx bx-home-alt"></i>',page_title: 'Event Organizer' })
    }

    static async sponserManage(req,res){
        res.render("Events/sponserManage", { layout: "layout/layout-model" })
    }

    static async EmsDetails(req,res){
        res.render("Events/EmsDetails",  { title: "Events", component_title:'Event',icon:'<i class="bx bx-home-alt"></i>',page_title: 'EMS Details' })
    }

    static async EmsAdd(req,res){
        res.render("Events/EmsAdd", { layout: "layout/layout-model" })
    }
}
module.exports = EventController;