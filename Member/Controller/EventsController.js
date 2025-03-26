const BaseController = require("./BaseController");
const Eventsmodel=require("../Model/EventsModel")

class EventsController extends BaseController{

static async getAllEvents(req,res){
    try{
        const result = await  Eventsmodel.getAllEvents();
        if (result){
            return res.status(200).json({status:"succes",
                msz:"data fetched succesfully",
                data:result,
            })
        }
        else{
            return res.status(200).json({status:"succes",
                msz:"error in fetching data",
                data:result,
            })
        }
    }
    catch(error){

    }

}
 

}
module.exports= EventsController;