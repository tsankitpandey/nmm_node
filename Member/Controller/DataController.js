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

    static async commodityMaster(req,res){
        try{
            const result = await  dataModel.commodityMaster();
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
     
    static async imoMaster(req,res){
        try{
            const result = await  dataModel.imoMaster();
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
    
    static async UnMaster(req,res){
        try{
            const result = await  dataModel.UnMaster();
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

    static async Companylist(req,res){
        try{
            const result = await  dataModel.Companylist();
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