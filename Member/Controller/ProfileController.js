const BaseController = require("./BaseController");
const ProfileModel=require("../Model/ProfileModel")

class ProfileController extends BaseController{

  static async profileGet(req, res, next) {
    try {
        const post = req.body;
        if (!post) {
            return res.status(400).json({ status: "error", message: "Invalid request body" });
        }

        const data = await ProfileModel.profileGet(post);
       
        if (data && Object.keys(data).length > 0) {
            return res.status(200).json({ status: "success",  data });
        } else {
            return res.status(200).json({ status: "error", message: "No data found" });
        }

    } catch (error) {
        next(error);
    }
  }


  static async UpdateCompanyLogo(req, res, next) {
    const post = req.body;
    const file=req.files;
    try {
      
        if (file.length>0) {
        
          const image = await super.uploadFiles(file, "DEMO");
          const data = await ProfileModel.UpdateCompanyLogo(image,post);
    
          if (data.affectedRows>0) {
              return res.status(200).json({ status: "success",  data });
          } else {
              return res.status(200).json({ status: "error", message: "No data found" });
          }
        }

       

    } catch (error) {
        next(error);
    }

  }

  static async UpdateCompanyBanner(req, res, next) {
    const post = req.body;
    const file=req.files;
    try {
      
        if (file.length>0) {
        
          const image = await super.uploadFiles(file, "DEMO");
          const data = await ProfileModel.UpdateCompanyBanner(image,post);
    
          if (data.affectedRows>0) {
              return res.status(200).json({ status: "success",  data });
          } else {
              return res.status(200).json({ status: "error", message: "No data found" });
          }
        }

    } catch (error) {
        next(error);
    }

  }

  static async SocialUpdate(req, res, next) {
    const post = req.body;

    try {
          const data = await ProfileModel.SocialUpdate(post);
    
          if (data.affectedRows>0) {
              return res.status(200).json({ status: "success",  data });
          } else {
              return res.status(200).json({ status: "error", message: "No data found" });
          }
        

    } catch (error) {
        next(error);
    }

  }
 
  static async EditIntro (req,res){
    const data=req.body;
    // return res.status(200).json(data)
   const result =await ProfileModel.EditIntro(data);
    try{
if(result && result.affectedRows >0){
    return res.status(200).json({status:"success",result})
}
else{
    return res.status(200).json({status:"error",result})
}
    }catch(error){
        return res.status(200).json({status:"error",error})
    }
  }

  static async updateMember(req, res) {
    const data = req.body;
  
    try {
      const result = await ProfileModel.updateMember(data);
  
      if (result && result.affectedRows > 0) {
        return res.status(200).json({
          status: "success",
          message: "Member updated successfully",
          result,
        });
      } else {
        return res.status(400).json({
          status: "error",
          message: "No rows were updated. Possibly invalid member_id.",
          result,
        });
      }
    } catch (error) {
      console.error("Error updating member:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error during member update",
        error,
      });
    }
  }
  

}
module.exports= ProfileController;