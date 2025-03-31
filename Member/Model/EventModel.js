const BaseModel=require('./BaseModel');

class EventModel extends BaseModel{

    static async Event(){

        return new Promise((resolve, rejects) => { 
            const query = `SELECT *, 
                            CASE 
                                WHEN status = 'current' THEN 1 
                                ELSE 0 
                            END AS status_flag
                        FROM nmm_event;
                        `;
            super.db.query(query, (err, result) =>{
            if (err) {
                console.error('error fetching Event list :', err);
                return rejects(err);
            }
            resolve(result);
        });
    });
    }
}
module.exports = EventModel;