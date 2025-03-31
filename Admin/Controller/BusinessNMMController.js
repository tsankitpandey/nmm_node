const BaseController=require("./BaseController");
const BusinessNMMModel=require("../Model/BusinessNMMModel")
class BusinessNMMController extends BaseController{

    static async ViewIndex(req, res){
        try {
            const ViewIndex = await BusinessNMMModel.ViewIndex();
            // return res.status(200).json({"mesg": ViewIndex});
            res.render("NMM/Business/ViewIndex", {
                title: "Business",
                component_title:'Business Impact',
                icon:'<i class="bx bx-home-alt"></i>',
                page_title: "View Impact",
                ViewIndex,
                
            });
        } catch (error) {
            console.error("Error in News:", error);
            req.flash("error", "An error occurred while fetching the News.");
            res.redirect(res.Admin("/ViewImpact"));
        }
        
    }

    static async ViewModel(req, res) {
        try {
            const { id } = req.query;
       
            const walletTransactions = await BusinessNMMModel.ViewModel(id);
            
            const ViewModels = walletTransactions.map(transaction => {
                const companies = transaction.sender_receiver_company_name.split(",");
                
                let senderCompanyName = "";
                let receiverCompanyName = "";
                
                companies.forEach(company => {
                    const [companyId, companyName] = company.split(":");
                    
                    if (parseInt(companyId) === transaction.sender_id) {
                        senderCompanyName = companyName;
                    }
                    if (parseInt(companyId) === transaction.receiver_id) {
                        receiverCompanyName = companyName;
                    }
                });
                
                return {
                    ...transaction,
                    sender_company_name: senderCompanyName,
                    receiver_company_name: receiverCompanyName
                };
            });
    
            
            res.render("NMM/Business/ViewModel", {
                layout: "layout/layout-model",
                title: "View Model",
                page_title: "View Model",
                ViewModels,
            });
            
        } catch (error) {
            console.error('Error fetching wallet data:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
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
            const receiver_id = data.receiver_id;
            const sender_id = data.sender_id
            
            const result = await BusinessNMMModel.TransactionSave(data, receiver_id, sender_id);
            // return res.status(200).json({"Received Data:": result});

        if (result) {
        
            req.flash("success", "Transaction saved successfully!");
            return res.status(200).redirect(res.Admin("/ViewImpact"));
          } else {
            req.flash("error", "Failed to save Transaction. No rows were affected.");
            return res.status(200).redirect(res.Admin("/ViewImpact"));
          }
        } catch (error) {
          console.error("Transaction Save Error", error);
          req.flash("error", "An error occurred while saving the transaction.");
          return res.status(500).redirect(res.Admin("/ViewImpact"));
        }
    }
    

}
module.exports = BusinessNMMController;