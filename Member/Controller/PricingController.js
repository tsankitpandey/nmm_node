const BaseController=require("./BaseController");
const PricingModel=require("../Model/PricingModel");

class PricingController extends BaseController{

    static async insertPricing (req,res){
     const data=req.body; 
    //  return res.status(200).json({data});
        try{
     const data=req.body; 
            const result = await  PricingModel.insertPricing(data);
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

    static async Requestget (req,res){
        const data=req.body; 
        const id= data.id;
        // return res.status(200).json({id});
           try{
        const data=req.body; 
               const result = await  PricingModel.Requestget(id);
               if (result){
                   return res.status(200).json({status:"success",
                       msz:"data fetched succesfully",
                       data:result,
                   })
               }
               else{
                   return res.status(200).json({status:"success",
                       msz:"error in fetching data",
                       data:result,
                   })
               }
           }
           catch(error){
       
           }
       
       }

    }
    module.exports= PricingController;