const { uploadFiles,deleteFiles } = require("../../services/imageUploader");
const BaseController = require("./BaseController")
const GalleryModel = require ("../Model/GalleryModel")


class GalleryController extends BaseController {
 

    static async AlbumInsert(req, res) {
        const data = req.body;
        const files = req.files;
        // return res.status(200).json({data,files})
        const albums = await uploadFiles(files, "DEMO");
        //    return res.status(200).json({albums})
        try {
          const result = await GalleryModel.AlbumInsert(data,albums)
          if(result){
           return res.status(200).json({status:"success",result})
          }else{
           return res.status(200).json({status:"error",result})
          }
        }
        catch (error) {
            return res.status(200).json(error)
        }
      


    }

    static async PhotoInsert(req, res) {
        const data = req.body;
        const files = req.files;
        // return res.status(200).json({data,files})
        const images = await uploadFiles(files, "DEMO");
        //    return res.status(200).json({images})
        try {
          const result = await GalleryModel.PhotoInsert(data,images)
          if(result){
           return res.status(200).json({status:"success",result})
          }else{
           return res.status(200).json({status:"error",result})
          }
        }
        catch (error) {
            console.log(error)
            return res.status(200).json(error)
        }
      


    }

    static async MediaGet(req, res) {
        const data = req.body;
        const id = data.company_id;
        //    return res.status(200).json(id)
        try {
          const result = await GalleryModel.MediaGet(id)
          if(result){
           return res.status(200).json({status:"success",result})
          }else{
           return res.status(200).json({status:"error",result})
          }
        }
        catch (error) {
            console.log(error)
            return res.status(200).json(error)
        }
      


    }

    static async AlbumGet(req, res) {
        const data = req.body;
        const id = data.company_id;
        //    return res.status(200).json(id)
        try {
          const result = await GalleryModel.AlbumGet(id)
          if(result){
           return res.status(200).json({status:"success",result})
          }else{
           return res.status(200).json({status:"error",result})
          }
        }
        catch (error) {
            console.log(error)
            return res.status(200).json(error)
        }
      
    }

    static async deleteMedia(req,res){
        const data = req.body; 
       const id = data.id;
 
        try {
            const File = await GalleryModel.GetFile(id);

            const deleteAws =  await deleteFiles(File);
            if(deleteAws[0].status==1){
            const result = await GalleryModel.deleteMedia(id);
            if(result){
             return res.status(200).json({status:"success",result})
            }else{
             return res.status(200).json({status:"error",result})
            }
        }
        else{
            return res.status(200).json({status:"error",result})
           }
          }
          catch (error) {
              console.log(error)
              return res.status(200).json(error)
          }
    }

}
module.exports = GalleryController