const BaseController=require("./BaseController");

class CrmNMMController extends BaseController{

    static async CrmIndex(req,res){

        res.render("NMM/CRM/ProspectList", { title: "Prospect List", component_title:'CRM', icon:'<i class="bx bx-home-alt"></i>', page_title: 'Prospect List', })
    }
    static async ProspectAdd(req,res){
        res.render("NMM/CRM/ProspectAdd", { layout: "layout/layout-model" })
    }
    static async sheetImport(req,res){
        res.render("NMM/CRM/SheetImport", { title: "Sheet Import", component_title:'CRM', icon:'<i class="bx bx-home-alt"></i>', page_title: 'Sheet List', })
      
   }

}
module.exports = CrmNMMController;