const BaseController = require("./BaseController");
const Newsmodel=require("../Model/Newsmodel")

class NewsController extends BaseController{

static async getAllNews(req,res){
    try{
        const result = await  Newsmodel.getAllNews();
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
module.exports= NewsController;