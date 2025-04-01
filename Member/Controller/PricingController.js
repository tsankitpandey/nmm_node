const BaseController = require("./BaseController");
const PricingModel = require("../Model/PricingModel");

class PricingController extends BaseController {

    static async insertPricing(req, res) {
        const data = req.body;
        //  return res.status(200).json({data});
        try {
            const data = req.body;
            const result = await PricingModel.insertPricing(data);
            if (result) {
                return res.status(200).json({
                    status: "succes",
                    msz: "data fetched succesfully",
                    data: result,
                })
            }
            else {
                return res.status(200).json({
                    status: "succes",
                    msz: "error in fetching data",
                    data: result,
                })
            }
        }
        catch (error) {

        }

    }

    static async Requestget(req, res) {
        const data = req.body;
        const id = data.id;
        // return res.status(200).json({id});
        try {
            const data = req.body;
            const result = await PricingModel.Requestget(id);
            if (result) {
                return res.status(200).json({
                    status: "success",
                    msz: "data fetched succesfully",
                    data: result,
                })
            }
            else {
                return res.status(200).json({
                    status: "success",
                    msz: "error in fetching data",
                    data: result,
                })
            }
        }
        catch (error) {

        }

    }

    static async RequestFillter(req, res) {
        const data = req.body;
        const id = data.id;



        try {
            const result = await PricingModel.RequestFillter(id);
            if (result) {
                return res.status(200).json({
                    status: "success",
                    data: result
                })
            }
        } catch (error) {
            return res.status(200).json({
                status: "error",
                msg: "error while fetching data",
            })
        }
    }

    static async RequestApprove(req, res) {
        const data = req.body;
        const file = req.files;
        const image = await super.uploadFiles(file, "DEMO");
        // return res.status(200).json({data, image});

        try {
            const result = await PricingModel.RequestApprove(data,image);
            if(result  ){
             return res.status(200).json({status:"success",data:result})
            }
            else{
                return res.status(200).json({status:"error",result})
            }
        }
       
        catch (error) {
            return res.status(200).json({ status: "error", msg: "Error while  data", error })
        }

    }

    static async ApprovedRequest(req,res){
        const id= req.body.id;
        // return res.status(200).json({id})
        try{
         const result= await PricingModel.ApprovedRequest(id);
         if (result){
            return res.status(200).json({status:"success",
                result
            })
         }
         else{
            return res.status(200).json({status:"errror",result})
         }

        }
            catch(error){
                return res.status(200).json({error})
            }
        
    }

}
module.exports = PricingController;