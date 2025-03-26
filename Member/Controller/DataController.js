const BaseController=require("./BaseController");
const dataModel=require("../Model/DataModel");

class DataController extends BaseController{

    static async getContainer(req,res){
        try{
            const result = await  dataModel.getContainer();
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

    static async airportMaster(req,res){
        try{
            const result = await  dataModel.airportMaster();
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
    module.exports= DataController;