const BaseController=require("./BaseController");

class NewsNMMController extends BaseController{

    static async NewsIndex(req,res){

        res.render("NMM/News/NewsIndex", { title: "News", component_title:'News', icon:'<i class="bx bx-home-alt"></i>',page_title: 'News' })
    }

    static async NewsList(req,res){

        res.render("NMM/News/NewsList", { title: "News", component_title:'News', icon:'<i class="bx bx-home-alt"></i>',page_title: 'News List' })
    }

    static async NewsAdd(req,res){
        res.render("NMM/News/NewsAdd", { layout: "layout/layout-model" })
    }

    static async Banner(req,res){

        res.render("NMM/News/Banner", { title: "Banner", component_title:'News', icon:'<i class="bx bx-home-alt"></i>',page_title: 'Banner' })
    }

    static async BannerAdd(req,res){
        res.render("NMM/News/BannerAdd", { layout: "layout/layout-model" })
    }

}
module.exports = NewsNMMController;