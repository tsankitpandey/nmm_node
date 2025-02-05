const BaseController=require("./BaseController");
const NewsNMMModel=require("../Model/NewsNMMModel")
class NewsNMMController extends BaseController{

    static async NewsIndex(req,res){

        res.render("NMM/News/NewsIndex", { title: "News", component_title:'News', icon:'<i class="bx bx-home-alt"></i>', page_title: "News",
        })
    }

    static async NewsList(req,res){

        try {
            const NewsList = await NewsNMMModel.NewsList();
            // return res.status(200).json({"mesg": NewsList})
            res.render("NMM/News/NewsList", {
                title: "News",
                component_title:'News',
                icon:'<i class="bx bx-home-alt"></i>',
                page_title: "News List",
                NewsList,
            });
        } catch (error) {
            console.error("Error in News:", error);
            req.flash("error", "An error occurred while fetching the News.");
            res.redirect(res.Admin("/newslist"));
        }
        
    }

    static async NewsAdd(req,res){
        try {
            const NewsAdd = await NewsNMMModel.NewsAdd();
            res.render("NMM/News/NewsAdd", {
                layout: "layout/layout-model",
                NewsAdd,
            });
        } catch (error) {
            console.error("Error in News:", error);
            req.flash("error", "An error occurred while fetching the News.");
            res.redirect(res.Admin("/newslist"));
        }
    }

    static async NewsSave(req, res){
        try {
            const data = req.body;
            const file =req.files;
            // return res.status(200).json({"mesg": file})
            const image = await super.uploadFiles(file,'DEMO');
            if(image){
            const result = await NewsNMMModel.NewsSave(data, image);
            if (result && result.affectedRows > 0) {
                req.flash('success', 'News saved successfully!');
                return res.status(200).redirect(res.Admin('/newslist'));
            } else {
                req.flash('error', 'Failed to save News. No rows were affected.');
                return res.status(200).redirect(res.Admin('/newslist'));
            }
        }
        } catch (error) {
            console.error('Error in News Save:', error.message);
            console.error('Error details:', error);
            req.flash('error', 'An error occurred while saving the news.');
            return res.status(500).redirect(res.Admin('/newslist'));
        }
        
    }

    static async Banner(req,res){

        res.render("NMM/News/Banner", { title: "Banner", component_title:'News', icon:'<i class="bx bx-home-alt"></i>',page_title: 'Banner' })
    }

    static async BannerAdd(req,res){
        res.render("NMM/News/BannerAdd", { layout: "layout/layout-model" })
    }

    static async BannerSave(req, res){
        try {
            const data = req.body;
            const file =req.files;
            // return res.status(200).json({"mesg": file})
            const image = await super.uploadFiles(file,'image');
            if(image){
            const result = await NewsNMMModel.BannerSave(data, image);
            if (result && result.affectedRows > 0) {
                req.flash('success', 'banner saved successfully!');
                return res.status(200).redirect(res.Admin('/banner'));
            } else {
                req.flash('error', 'Failed to save banner. No rows were affected.');
                return res.status(200).redirect(res.Admin('/banner'));
            }
        }
        } catch (error) {
            console.error('Error in News Save:', error.message);
            console.error('Error details:', error);
            req.flash('error', 'An error occurred while saving the banner.');
            return res.status(500).redirect(res.Admin('/banner'));
        }
        
    }
}
module.exports = NewsNMMController;