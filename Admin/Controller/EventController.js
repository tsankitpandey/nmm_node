const BaseController = require("./BaseController");
const EventModel = require("../Model/EventModel")

class EventController extends BaseController {

    static async EventInfoIndex(req, res) {

        res.render("Events/eventInfo", { title: "Events", component_title: 'Event', icon: '<i class="bx bx-home-alt"></i>', page_title: 'Event Information' })
    }
    static async sponsorIndex(req, res) {

        res.render("Events/sponsorIndex", { title: "Events", component_title: 'Event', icon: '<i class="bx bx-home-alt"></i>', page_title: 'Sponsor Index' })
    }

    static async sponserAdd(req, res) {
        res.render("Events/sponserAdd", { layout: "layout/layout-model" })
    }

    static async EventOrgIndex(req, res) {

        res.render("Events/EventOrganizerIndex", { title: "Events", component_title: 'Event', icon: '<i class="bx bx-home-alt"></i>', page_title: 'Event Organizer' })
    }

    static async sponserManage(req, res) {
        res.render("Events/sponserManage", { layout: "layout/layout-model" })
    }

    static async EmsDetails(req, res) {
        res.render("Events/EmsDetails", { title: "Events", component_title: 'Event', icon: '<i class="bx bx-home-alt"></i>', page_title: 'EMS Details' })
    }

    static async EmsAdd(req, res) {
        res.render("Events/EmsAdd", { layout: "layout/layout-model" })
    }


    static async EventorgInsert(req, res) {
        const data = req.body;
        //  return res.status(200).json({data});
        try {
            const result = await EventModel.EventorgInsert(data);

            if (result && result.result .affectedRows > 0) {
                req.flash("success", "event orgnizer inserted");
                return res.status(200).redirect(res.Admin("/EventOrg"));
            } else {
                req.flash("error", "Failed to insert. No rows were affected.");
                return res.status(200).redirect(res.Admin("/EventOrg"));
            }
        } catch (error) {
            console.error("Error inserting EventOrg model:", error);
            req.flash("error", "An error occurred while inserting the comment.");
            return res.status(500).redirect(res.Admin("/EventOrg"));
        }
    } catch(error) {
        req.flash("error", "An error occurred while inserting the event orginzer.");
        return res.status(500).redirect(res.Admin("/EventOrg"));
    }





}
module.exports = EventController;