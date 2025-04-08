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

    static async Services(req,res){
        try{
            const result = await dataModel.Services();
            if(result){
                return res.status(200).json({status:"success",result})
            }
            else{
                return res.status(200).json({status:"error",result}) 
            }
        }
            catch(error){
                console.log(error,"error")
                return res.status(200).json({status:"error",error}) 
            }

        
    }

    static async insertCompanyServices(req, res){
        try {
          const { selectedServices, companyId } = req.body;
         
          if (!selectedServices || !companyId) {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
          }
      
          const result = await dataModel.InsertServices(companyId, selectedServices);
          if(result){
            return res.status(200).json({ status: "success", message: "Services inserted", result });
          }
          else{
            return res.status(200).json({ status: "error", message: " error in Services", result });
          }
      
        } catch (error) {
          console.error("Insert Services Error:", error);
          return res.status(200).json({ status: "error", message: "Internal server error", error });
        }
      };

    }
    module.exports= DataController;