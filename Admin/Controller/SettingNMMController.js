const BaseController=require("./BaseController");
const SettingModel=require("../Model/SettingModel")
class SettingNMMController extends BaseController{

    static async SettingIndex(req, res) {
        try {
            const setting = await SettingModel.SettingIndex();
            
            const email = setting.emails;
            const accounts = setting.accounts;
            const settings = setting.settings;
            
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
            req.flash("success", "data updated successfully!");
            return res.status(200).redirect(res.Admin("/setting"));
          } else {
            req.flash("error", "Error in updating data.");
            return res.status(200).redirect(res.Admin("/setting"));
          }
        } catch (error) {
          console.error("Error  data Update:", error);
          req.flash("error", "Error in updating data.");
          return res.status(200).redirect(res.Admin("/setting"));
        }
    }

    static async EmailUpdate(req, res) {

        const data = req.body;
        const id = req.body.settingId;
        try {
            
            const updateResult = await SettingModel.EmailUpdate(data, id);
    
            if (updateResult.affectedRows > 0) {
                req.flash("success", "Emails updated successfully!");
            } else {
                req.flash("warning", "No changes were made.");
            }
    
            return res.redirect('/setting');
    
        } catch (error) {
            console.error("Error in Emails Update:", error);
            req.flash("error", "An error occurred while updating Emails.");
            return res.redirect('/setting');
        }
    }
    


}
module.exports = SettingNMMController;