const BaseController=require("./BaseController");
const SettingModel=require("../Model/SettingModel")
class SettingNMMController extends BaseController{

    static async SettingIndex(req,res){

        try {
            const setting = await SettingModel.SettingIndex();
            const Standards = setting.Standard
            const customs = setting.custom
            const accounts = setting.account
            // return res.status(200).json({'msg':accounts})
            res.render("NMM/Setting/SettingIndex", {
                title: "Email Template List",
                component_title:'EmailTemplate',
                icon:'<i class="bx bx-home-alt"></i>',
                page_title: 'Email Template List',
                Standards,
                customs,
                accounts,
            });
        } catch (error) {
            console.error("Error in Active prospect:", error);
            req.flash("error", "An error occurred while fetching the email.");
            res.redirect(res.Admin("/setting"));
        }

    }


}
module.exports = SettingNMMController;