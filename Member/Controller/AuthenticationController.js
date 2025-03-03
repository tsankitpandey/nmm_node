const BaseController =require('./BaseController');
const jwt = require("jsonwebtoken");

const AuthenticationModel=require('../Model/AuthenticationModel');

class AuthenticationController extends BaseController{

    static async loginVerify(req,res){
        const {username, password} = req.body;
      
        if(username) {

            const data=await AuthenticationModel.loginVerify(username, password );

         
            if (data.length>0) {
                
                const token = jwt.sign({ username }, process.env.JWT_SECRET, {
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
}


module.exports=AuthenticationController;