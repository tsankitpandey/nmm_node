const BaseController = require("./BaseController");
const AuthenticationModel=require("../Model/AuthenticationModel")
const jwt = require("jsonwebtoken");



class AuthenticationController extends BaseController {
 
    static async login(req, res) {
      
        res.render("Authentication/login", {
            layout: "layout/layout-without-nav",
            title: "Login",
            page_title: "Login",
        });
    }

  
    static async loginVerify(req, res) {
        const {username, password} = req.body;
      
        if(username) {

            const data=await AuthenticationModel.loginVerify(username, password );

         
            if (data.length>0) {
                
                const token = jwt.sign({ username }, process.env.JWT_SECRET, {
                    expiresIn: "1h", 
                
                });
                
               
                res.cookie("authToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production", 
                });

                return res.status(200).json({
                    status:'success',
                    redirect:res.Admin('/dashboard'),
                    message:'Login successfull'
                })
             
            } else {
                return res.status(200).json({
                    status:'error',
                    message:'Login Failed'
                })
        
            }
         
        }
       
        
    }

  
}

module.exports = AuthenticationController;
