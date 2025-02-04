const BaseController=require("./BaseController");

class ConferenceNMMController extends BaseController{

    static async AttendeeIndex(req, res){
        res.render("NMM/Conference/AttendeeIndex", {title: "Conference", component_title:'Conference', icon:'<i class="bx bx-home-alt"></i>', page_title: 'Attedee List' })
    }

    static async EventIndex(req, res){
        res.render("NMM/Conference/EventIndex", {title: "Conference", component_title:'Conference', icon:'<i class="bx bx-home-alt"></i>', page_title: 'Events' })
    }

    static async EventAdd(req, res){
        res.render("NMM/Conference/EventAdd", {title: "Conference", component_title:'Conference', icon:'<i class="bx bx-home-alt"></i>', page_title: 'Event' })
    }
}
module.exports = ConferenceNMMController;