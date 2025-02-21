const BaseController = require("./BaseController");
const EventModel = require("../Model/EventModel")

class EventController extends BaseController {

  static async EventInfoIndex(req, res) {
    res.render("Events/eventInfo", {
      title: "Events",
      component_title: "Event",
      icon: '<i class="bx bx-home-alt"></i>',
      page_title: "Event Information",
    });
  }
  static async sponsorIndex(req, res) {
    res.render("Events/sponsorIndex", {
      title: "Events",
      component_title: "Event",
      icon: '<i class="bx bx-home-alt"></i>',
      page_title: "Sponsor Index",
    });
  }

  static async EventIndex(req, res) {
    try {
      const eventData = await EventModel.FetchEvent();

      // return res.status(200).json({event})

      res.render("NMM/Conference/EventIndex", { title: "Conference", component_title: 'Conference', icon: '<i class="bx bx-home-alt"></i>', page_title: 'Events', eventData })


    }
    catch (error) {

    }

  }

  static async EventAdd(req, res) {
    res.render("NMM/Conference/EventAdd", { title: "Conference", component_title: 'Conference', icon: '<i class="bx bx-home-alt"></i>', page_title: 'Event' })
  }

  static async sponserAdd(req, res) {
    res.render("Events/sponserAdd", { layout: "layout/layout-model" });
  }

  static async EventOrgIndex(req, res) {
    const eventOrgnizer = await EventModel.FetchEventOrganizers();

    res.render("Events/EventOrganizerIndex", {
      title: "Events",
      component_title: "Event",
      icon: '<i class="bx bx-home-alt"></i>',
      page_title: "Event Organizer",
      eventOrgnizer
    });
  }

  static async sponserManage(req, res) {
    res.render("Events/sponserManage", { layout: "layout/layout-model" });
  }

  static async EmsDetails(req, res) {
    res.render("Events/EmsDetails", {
      title: "Events",
      component_title: "Event",
      icon: '<i class="bx bx-home-alt"></i>',
      page_title: "EMS Details",
    });
  }

  static async EmsAdd(req, res) {
    res.render("Events/EmsAdd", { layout: "layout/layout-model" });
  }


  static async EventorgUpdate(req, res) {
    const data = req.body;
    const id = req.params.id;
    //  return res.status(200).json({id});
    try {
      const result = await EventModel.EventorgUpdate(data, id);

      if (result && result.result.affectedRows > 0) {
        req.flash("success", "event orgnizer updated..");
        return res.status(200).redirect(res.Admin("/EventOrg"));
      } else {
        req.flash("error", "Failed to update. No rows were affected.");
        return res.status(200).redirect(res.Admin("/EventOrg"));
      }
    } catch (error) {
      console.error("Error updating EventOrg model:", error);
      req.flash("error", "An error occurred while updating the orgnizer.");
      return res.status(500).redirect(res.Admin("/EventOrg"));
    }
  }
  catch(error) {
    req.flash("error", "An error occurred while updating the event orginzer.");
    return res.status(500).redirect(res.Admin("/EventOrg"));
  }

  static async EventSave(req, res) {
    try {
      const data = req.body;
      const file = req.files;
      // return res.status(200).json({ mesg: file });
      const image = await super.uploadFiles(file, "DEMO");
      if (image) {
        const result = await EventModel.EventSave(data, image);
        if (result && result.affectedRows > 0) {
          req.flash("success", "Event saved successfully!");
          return res.status(200).redirect(res.Admin("/EventInfo"));
        } else {
          req.flash("error", "Failed to save Event. No rows were affected.");
          return res.status(200).redirect(res.Admin("/EventInfo"));
        }
      }
    } catch (error) {
      console.error("Error in Event Save:", error.message);
      console.error("Error details:", error);
      req.flash("error", "An error occurred while saving the Event.");
      return res.status(500).redirect(res.Admin("/EventInfo"));
    }
  }

  static async AddEvent(req, res) {
    try {
      const data = req.body;
      const file = req.files;
      // return res.status(200).json({data  });
      const image = await super.uploadFiles(file, "EVENT");
      if (image) {

        const result = await EventModel.AddEvent(data, image);


        if (result) {
          req.flash("success", "Event saved successfully!");
          return res.status(200).redirect(res.Admin("/Event"));
        } else {
          req.flash("error", "Failed to save Event. No rows were affected.");
          return res.status(200).redirect(res.Admin("/Event"));
        }
      }
    } catch (error) {
      console.error("Error in Event Save:", error.message);
      console.error("Error details:", error);
      req.flash("error", "An error occurred while saving the Event.");
      return res.status(500).redirect(res.Admin("/Event"));
    }
  }


  static async EditEvent(req, res) {
    try {
      const id = parseInt(req.params.id);
      const eventData = await EventModel.FetchEvent();
      const selectedEvent = eventData.data.find(event => event.id === id);
   
      res.render("NMM/Conference/EventEdit", { title: "Conference", component_title: 'Conference', icon: '<i class="bx bx-home-alt"></i>', page_title: 'Events', eventData: selectedEvent })

    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).render("NMM/Conference/EventEdit", {
        title: "Conference",
        component_title: "Conference",
        icon: '<i class="bx bx-home-alt"></i>',
        page_title: "EventEdit",
        error: "Internal Server Error"
      });
    }
  }

  static async DeleteEvent(req,res){
    const id = req.params.id;
    try{
      const result= await EventModel.DeleteEvent(id);
      if(result){
        req.flash("success", "Event deleted succesfully.");
        return res.status(200).redirect(res.Admin("/Event"));
      }
      else{
        req.flash("error", "Error in deleting event.");
        return res.status(200).redirect(res.Admin("/Event"));
      }

    }
    catch(error){
      console.error(error)
      req.flash("error",  "Error in event.");
      return res.status(200).redirect(res.Admin("/Event"));
    }
     
    
  }



}
module.exports = EventController;