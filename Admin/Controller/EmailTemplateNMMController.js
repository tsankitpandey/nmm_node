const BaseController=require("./BaseController");
const EmailTemModel=require("../Model/EmailTemModel")
class EmailTemplateNMMController extends BaseController{

    static async EmailIndex(req,res){

        try {
            const EmailTem = await EmailTemModel.EmailIndex();
            const Standards = EmailTem.Standard
            const customs = EmailTem.custom
            // const EmailTem_2 = await EmailModel.EmailIndex_2();
            // return res.status(200).json({'msg':EmailTem})
            res.render("NMM/EmailTemplate/EmlTemplateList", {
                title: "Email Template List",
                component_title:'EmailTemplate',
                icon:'<i class="bx bx-home-alt"></i>',
                page_title: 'Email Template List',
                Standards,
                customs,
        
            });
        } catch (error) {
            console.error("Error in Active prospect:", error);
            req.flash("error", "An error occurred while fetching the email.");
            res.redirect(res.Admin("/emailList"));
        }

    }

}
module.exports = EmailTemplateNMMController;