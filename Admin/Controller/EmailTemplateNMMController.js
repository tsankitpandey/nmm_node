const BaseController=require("./BaseController");
const EmailTemModel=require("../Model/EmailTemModel")

class EmailTemplateNMMController extends BaseController{

    static async EmailTemIndex(req,res){

        try {
            const EmailTem = await EmailTemModel.EmailTemIndex();
            const Standards = EmailTem.Standard
            const customs = EmailTem.custom
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

    static async EmailTemEdit(req, res) {
        try {
            const { id } = req.query;
            const EmailEdit = await EmailTemModel.EmailTemIndex();
            const Standards = EmailEdit.Standard
            const EmailEdits = Standards.find(Standards => Standards.id == id);
            // return res.status(200).json({"msg": EmailEdits})

            if (!EmailEdits) {
                return res.status(404).json({ message: 'email not found' });
            }
            else{
                res.render("NMM/EmailTemplate/EmailTemEdit", {
                layout: "layout/layout-model",
                title: "Email Edit",
                page_title: "Email Edit",
                EmailEdits, 
            });
        }
        } catch (error) {
            console.error('Error fetching Email:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async EmailTemUpdate(req, res) {

        const { id, purpose, subject, from, message} = req.body; 
        // return res.status(200).json({"msg":req.body})
        try {

            const updateResult = await EmailTemModel.updateEmailTem(id, purpose, subject, from, message);
           
            if (updateResult.affectedRows > 0) {
                req.flash("success", "Email Updated successfully!");
                return res.status(200).redirect(res.Admin('/emailList'));
            } else {
                req.flash("warning", "Failed to Update Email. No rows were affected.");
                return res.status(200).redirect(res.Admin('/emailList'));
            }
        } catch (error) {
            console.error("Error in Email:", error);
            req.flash("error", "An error occurred while updating the Email.");
            return res.status(200).redirect(res.Admin('/emailList'));
        }
    }

    static async EmailTemView(req, res) {
        try {
            const { id } = req.query;
            const EmailView = await EmailTemModel.EmailTemIndex();
            const Standards = EmailView.Standard
            const EmailViews = Standards.find(Standards => Standards.id == id);

            if (!EmailViews) {
                return res.status(404).json({ message: 'email not found' });
            }
            else{
                res.render("NMM/EmailTemplate/EmailTemView", {
                layout: "layout/layout-model",
                title: "Email View",
                page_title: "Email View",
                EmailViews, 
            });
        }
        } catch (error) {
            console.error('Error fetching Email:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async CustomTemEdit(req, res) {
        try {
            const { id } = req.query;
            const CustomEdit = await EmailTemModel.EmailTemIndex();
            const customs = CustomEdit.custom
            const CustomEdits = customs.find(customs => customs.id == id);

            if (!CustomEdits) {
                return res.status(404).json({ message: 'email not found' });
            }
            else{
                res.render("NMM/EmailTemplate/CustomTemEdit", {
                layout: "layout/layout-model",
                title: "Custom Edit",
                page_title: "Custom Edit",
                CustomEdits, 
            });
        }
        } catch (error) {
            console.error('Error fetching Email:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    static async CustomTemUpdate(req, res) {

        const { id, purpose, subject, from, message} = req.body; 
        try {
            const updateResult = await EmailTemModel.CustomTemUpdate(id, purpose, subject, from, message);
           
            if (updateResult.affectedRows > 0) {
                req.flash("success", "Custom Email Updated successfully!");
                return res.status(200).redirect(res.Admin('/emailList'));
            } else {
                req.flash("warning", "Failed to Update Custom Email. No rows were affected.");
                return res.status(200).redirect(res.Admin('/emailList'));
            }
        } catch (error) {
            console.error("Error in Email:", error);
            req.flash("error", "An error occurred while updating the Custom Email.");
            return res.status(200).redirect(res.Admin('/emailList'));
        }
    }

    static async CustomTemView(req, res) {
        try {
            const { id } = req.query;
            const CustomView = await EmailTemModel.EmailTemIndex();
            const customs = CustomView.custom
            const CustomViews = customs.find(customs => customs.id == id);
            // return res.status(200).json({"msg": CustomViews })
            if (!CustomViews) {
                return res.status(404).json({ message: 'email not found' });
            }
            else{
                res.render("NMM/EmailTemplate/CustomTemView", {
                layout: "layout/layout-model",
                title: "Custom View",
                page_title: "Custom View",
                CustomViews, 
            });
        }
        } catch (error) {
            console.error('Error fetching Email:', error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

   
    static async CustomTemDelete(req, res) {
        try {
            let { id } = req.query; // Get the `id` parameter from the query
    
            if (!id) {
                req.flash('error', 'No emails selected for deletion.');
                return res.status(400).redirect(res.Admin('/emailList'));
            }
    
            const idArray = id.split(",").map(Number); // Convert comma-separated string into an array
    
            const result = await EmailTemModel.DeleteTemEmail(idArray);
    
            if (result && result.affectedRows > 0) { 
                req.flash('success', 'Emails deleted successfully!');
            } else {
                req.flash('error', 'Failed to delete emails. No rows were affected.');
            }
    
            return res.status(200).redirect(res.Admin('/emailList'));
    
        } catch (error) {
            console.error('Error in Email deletion:', error);
            req.flash('error', 'An error occurred while deleting the emails.');
            return res.status(500).redirect(res.Admin('/emailList'));
        }
    }

    
    static async CustomTemAdd(req, res){

        res.render("NMM/EmailTemplate/CustomTemAdd", { title: "Add", layout: "layout/layout-model", component_title:'EmailTemplate', icon:'<i class="bx bx-home-alt"></i>', page_title: 'Custom Add' })
    }

    static async CustomTemSave(req, res){
        try {
            const data = req.body;
 
            const result = await EmailTemModel.CustomTemSave(data);
            console.log("Insert result:", result);
            if (result && result.affectedRows > 0) {
                req.flash('success', 'custom Email saved successfully!');
                return res.status(200).redirect(res.Admin('/emailList'));
            } else {
                req.flash('error', 'Failed to save custom Email. No rows were affected.');
                return res.status(200).redirect(res.Admin('/emailList'));
            }
        } catch (error) {
            console.error('Error in custom Email Save:', error.message);
            console.error('Error details:', error);
            req.flash('error', 'An error occurred while saving the custom email.');
            return res.status(500).redirect(res.Admin('/emailList'));
        }
        
    }


    static async ActivateTemEmail(req, res) {
        try {
            let { id } = req.query;  // Get the `id` parameter from query
    
            if (!id) {
                req.flash('error', 'No emails selected for activation.');
                return res.status(400).redirect(res.Admin('/emailList'));
            }
    
            const idArray = id.split(",").map(Number); // Convert comma-separated string into an array
    
            const result = await EmailTemModel.ActivateTemEmail(idArray);
    
            if (result && result.affectedRows > 0) { 
                req.flash('success', 'Emails activated successfully!');
            } else {
                req.flash('error', 'Failed to activate emails. No rows were affected.');
            }
    
            return res.status(200).redirect(res.Admin('/emailList'));
    
        } catch (error) {
            console.error('Error in Email activation:', error);
            req.flash('error', 'An error occurred while activating the emails.');
            return res.status(500).redirect(res.Admin('/emailList'));
        }
    }
    

    static async DeactivateTemEmail(req, res) {
        try {
            let { id } = req.query; 
    
            if (!id) {
                req.flash('error', 'No emails selected for deactivation.');
                return res.status(400).redirect(res.Admin('/emailList'));
            }
    
            const idArray = id.split(",").map(Number); 
    
            const result = await EmailTemModel.DeactivateTemEmail(idArray);
    
            if (result && result.affectedRows > 0) { 
                req.flash('success', 'Emails deactivated successfully!');
            } else {
                req.flash('error', 'Failed to deactivate emails. No rows were affected.');
            }
    
            return res.status(200).redirect(res.Admin('/emailList'));
    
        } catch (error) {
            console.error('Error in Email deactivation:', error);
            req.flash('error', 'An error occurred while deactivating the emails.');
            return res.status(500).redirect(res.Admin('/emailList'));
        }
    }
    

    static async sendTestEmail(req, res) {
        try {
            const { email, ids } = req.body;
            if (!email || !ids || ids.length === 0) {
                return res.status(400).json({ status: 'error', message: 'Invalid input data.' });
            }

            for (const id of ids) {
                const template = await EmailSetup.emailTemplate(id);
                // return res.status(200).json({template});
                if (!template) {
                    return res.status(404).json({ status: 'error', message: `Email template with ID ${id} not found.` });
                }

                const sent = await EmailSetup.RequestDemo(email, template);
                if (!sent) {
                    return res.status(500).json({ status: 'error', message: `Failed to send email for template ID ${id}.` });
                }
            }

            return res.json({
                message: 'Mail successfully sent.',
                status: 'success',
            });
        } catch (error) {
            console.error('Error in sendTestEmail:', error);
            return res.status(500).json({
                message: 'Failed to send email, please try again.',
                status: 'error',
            });
        }
    }
    


}
module.exports = EmailTemplateNMMController;