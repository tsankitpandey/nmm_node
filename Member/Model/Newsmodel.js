const BaseModel=require('./BaseModel');

class newsModel extends BaseModel{

    static async getAllNews() {
        return new Promise((resolve, reject) => {
           super.db.query("SELECT * FROM nmm_news ", 
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
module.exports=newsModel;