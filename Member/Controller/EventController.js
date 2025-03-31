const BaseController=require('./BaseController');
const EventModel=require('../Model/EventModel');

class EventController extends BaseController{

    static async Event(req,res){
        try{
            const result = await EventModel.Event();
            if(result.length>0){
                res.status(200).json({status:'success',data:result})

            }
        }catch(err){
            next(err);

        }

    }
}
module.exports = EventController;