const BaseController =require('./BaseController');
const jwt = require("jsonwebtoken");

const AuthenticationModel=require('../Model/AuthenticationModel');

class AuthenticationController extends BaseController{

    static async loginVerify(req,res){
        const {email, password} = req.body;
       
      
        if(email) {

            const data=await AuthenticationModel.loginVerify(email, password );

         
            if (data.length>0) {
                
                const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                    expiresIn: "1h", 
                
                });
                
                return res.status(200).json({
                    status:'success',
                    token:token,
                    data:data,
                    message:'Login successfull'
                })
             
            } else {
                return res.status(200).json({
                    status:'error',
                    message:'Login Failed'
                })
        
            }
         
        }else{
            return res.status(200).json({
                status:'error',
                message:'User Not Found'
            })
        }
       
        
    }

    static async signup(req,res){
        const data = req.body;
        const file=req.files;
        // return res.status(200).json({file})

        try{
            const image = await super.uploadFiles(file, "DEMO");
           
            const result =  await AuthenticationModel.signup(data,image);
            if (result) {
                return res.status(200).json({status:"success",msg:"data inserted succesfully"})
               
            } else {
                return res.status(200).json({status:"error",msg:"error while inserting data"})
                
            }
        } catch (error) {
            return res.status(200).json({status:"error",msg:"error in model try-catch"})
           
        }

    }
}


module.exports=AuthenticationController;