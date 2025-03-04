const BaseController=require("./BaseController");
const SettingModel=require("../Model/SettingModel")
class SettingNMMController extends BaseController{

    static async SettingIndex(req, res) {
        try {
            const setting = await SettingModel.SettingIndex();
            
            const email = setting.emails;
            const accounts = setting.accounts;
            const settings = setting.settings;
            // return res.status(200).json({"msg": settings})
            
            res.render("NMM/Setting/SettingIndex", {
                title: "Email Template List",
                component_title: "EmailTemplate",
                icon: '<i class="bx bx-home-alt"></i>',
                page_title: "Email Template List",
                email,
                accounts,
                settings,
            });
        } catch (error) {
            console.error("Error in SettingIndex:", error);
            req.flash("error", "An error occurred while fetching the email settings.");
            res.redirect(res.Admin("/setting"));
        }
    }
    
    static async SettingUpdate12(req, res) {
        const data = req.body;
        const file = req.files;
        const accountId = req.params.AccountId;
        let profile = null;
        try {
 
            if (file && Object.keys(file).length > 0) {
                profile = await super.uploadFiles(file, "DEMO");
              } 

            const updateResult = await SettingModel.SettingUpdate(accountId, data, profile);
    
            if (updateResult?.affectedRows > 0) {
                req.flash("success", "Settings updated successfully!");
            } else {
                req.flash("warning", "No changes were made.");
            }
    
            return res.redirect('/emailList');
    
        } catch (error) {
            console.error("Error in Settings Update:", error);
            req.flash("error", "An error occurred while updating settings.");
            return res.redirect('/emailList');
        }
    }

    static async SettingUpdate(req, res) {
        const data = req.body;
        const file = req.files;
        const accountId = req.body.AccountId;
        let profile = null;
      
        
        if (file && Object.keys(file).length > 0) {
            profile = await super.uploadFiles(file, "DEMO");
        } 
      
        try {
          const result = await SettingModel.SettingUpdate(accountId, data, profile);
      
          if (result && result.affectedRows > 0) {
            req.flash("success", "Settings updated successfully!");
            return res.status(200).redirect(res.Admin("/emailList"));
          } else {
            req.flash("error", "Error in updating Settings.");
            return res.status(200).redirect(res.Admin("/emailList"));
          }
        } catch (error) {
          console.error("Error  Settings Update:", error);
          req.flash("error", "Error in updating Settings.");
          return res.status(200).redirect(res.Admin("/emailList"));
        }
      }
    

    static async EmailUpdate(req, res) {

        const data = req.body;
        const id = req.params.id;
        return res.status(200).json({id})
        try {
            
            const updateResult = await SettingModel.EmailUpdate(data, id);
    
            if (updateResult.affectedRows > 0) {
                req.flash("success", "Settings updated successfully!");
            } else {
                req.flash("warning", "No changes were made.");
            }
    
            return res.redirect('/setting');
    
        } catch (error) {
            console.error("Error in Settings Update:", error);
            req.flash("error", "An error occurred while updating settings.");
            return res.redirect('/setting');
        }
    }
    


}
module.exports = SettingNMMController;