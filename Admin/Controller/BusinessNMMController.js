const BaseController=require("./BaseController");
const BusinessNMMModel=require("../Model/BusinessNMMModel")
class BusinessNMMController extends BaseController{

    static async ViewIndex(req, res){
        res.render("NMM/Business/ViewIndex", {title: "Business", component_title:'Business Impact', icon:'<i class="bx bx-home-alt"></i>', page_title: 'View Impact' })
    }

    static async TransactionIndex(req, res){

        try {
            const Transaction = await BusinessNMMModel.TransactionAdd();

            // return res.status(200).json({"mesg": Transaction});
            res.render("NMM/Business/TransactionAdd", {
                title: "Business",
                component_title:'Business Impact',
                icon:'<i class="bx bx-home-alt"></i>',
                page_title: "Transaction",
                Transaction,
            });
        } catch (error) {
            console.error("Error in News:", error);
            req.flash("error", "An error occurred while fetching the News.");
            res.redirect(res.Admin("/ViewImpact"));
        }
        
    }

    static async TransactionSave(req, res) {
        try {
            
            const data = req.body;
            const result = await BusinessNMMModel.TransactionSave(data);
    
            if (result && result.affectedRows > 0) {
                req.flash('success', 'Transaction saved successfully!');
                return res.status(200).redirect(res.Admin('/Transaction'));
            }
    
            req.flash('error', 'Failed to save Transaction. No rows were affected.');
            return res.status(200).redirect(res.Admin('/Transaction'));
    
        } catch (error) {
            console.error('Error in Transaction Save:', error.message);
            console.error('Error details:', error);
            req.flash('error', 'An error occurred while saving the transaction.');
            return res.status(500).redirect(res.Admin('/Transaction'));
        }
    }
    

}
module.exports = BusinessNMMController;