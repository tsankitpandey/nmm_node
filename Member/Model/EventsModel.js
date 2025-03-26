const BaseModel=require('./BaseModel');

class EventsModel extends BaseModel{

    static async getAllEvents() {
        return new Promise((resolve, reject) => {
           super.db.query("SELECT * FROM nmm_event ", 
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
  

}
module.exports=EventsModel;