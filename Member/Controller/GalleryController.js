const { uploadFiles, deleteFiles } = require("../../services/imageUploader");
const BaseController = require("./BaseController");
const GalleryModel = require("../Model/GalleryModel");

class GalleryController extends BaseController {
  static async AlbumInsert(req, res) {
    const data = req.body;
    const files = req.files;
    // return res.status(200).json({data,files})
    const albums = await uploadFiles(files, "DEMO");
    //    return res.status(200).json({albums})
    try {
      const result = await GalleryModel.AlbumInsert(data, albums);
      if (result) {
        return res.status(200).json({ status: "success", result });
      } else {
        return res.status(200).json({ status: "error", result });
      }
    } catch (error) {
      return res.status(200).json(error);
    }
  }

  static async PhotoInsert(req, res) {
    const data = req.body;
    const files = req.files;
    // return res.status(200).json({data,files})
    const images = await uploadFiles(files, "DEMO");
    //    return res.status(200).json({images})
    try {
      const result = await GalleryModel.PhotoInsert(data, images);
      if (result) {
        return res.status(200).json({ status: "success", result });
      } else {
        return res.status(200).json({ status: "error", result });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json(error);
    }
  }

  static async MediaGet(req, res) {
    const data = req.body;
    const id = data.company_id;
   
    try {
      const result = await GalleryModel.MediaGet(id);
      if (result) {
        return res.status(200).json({ status: "success", result });
      } else {
        return res.status(200).json({ status: "error", result });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json(error);
    }
  }

  static async AlbumGet(req, res) {
    const data = req.body;
    const id = data.company_id;
    
    try {
      const result = await GalleryModel.AlbumGet(id);
      if (result) {
        return res.status(200).json({ status: "success", result });
      } else {
        return res.status(200).json({ status: "error", result });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json(error);
    }
  }

  static async deleteMedia(req, res) {
    const data = req.body;
    const id = data.id;

    try {
      const File = await GalleryModel.GetFile(id);

      const deleteAws = await deleteFiles(File);
      if (deleteAws[0].status == 1) {
        const result = await GalleryModel.deleteMedia(id);
        if (result) {
          return res.status(200).json({ status: "success", result });
        } else {
          return res.status(200).json({ status: "error", result });
        }
      } else {
        return res.status(200).json({ status: "error", result });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json(error);
    }
  }

  static async updateAlbum(req, res) {
    const data = req.body;
    const files = req.files;
    let galleryresults;
  
    try {
      
      if (files && files.length > 0) {
        galleryresults = await uploadFiles(files, "DEMO");
      }
  
     
      const old_data = await GalleryModel.GetAlum(data.album_id);
  
      
      let fileUrls = [];
  
      if (Array.isArray(data.file_url)) {
        fileUrls = data.file_url;
      } else if (typeof data.file_url === "string") {
        fileUrls = [data.file_url];
      }
  
     
      const matchedFiles = old_data.filter((item) =>
        fileUrls.includes(item.file_url)
      );
  
      const unmatchedFiles = old_data.filter(
        (item) => !fileUrls.includes(item.file_url)
      );
  
     
      let mergedResults;
  
      if (galleryresults && galleryresults.length > 0) {
        mergedResults = [
          ...galleryresults.map((item) => ({
            file_url: item.thumbUrl,
            extension_type: item.extension,
          })),
          ...matchedFiles.map((item) => ({
            file_url: item.file_url,
            extension_type: item.extension_type,
          })),
        ];
      } else {
        mergedResults = matchedFiles;
      }
  
     
      await deleteFiles(unmatchedFiles);
  
      
      const delete_album = await GalleryModel.AlbumDelete(data.album_id);
  
      if (delete_album) {
    //  return res.status(200).json({data,mergedResults});
        const insert_album = await GalleryModel.updateAlbum(data, mergedResults);
    //  return res.status(200).json(insert_album);
        if (insert_album) {
          const result = await GalleryModel.AlbumGet(data.company_id);
          return res.status(200).json({ status: "success", data: result });
        }
      }
  
      return res.status(200).json({ status: "error", msz: "Album update failed" });
  
    } catch (error) {
      console.error("updateAlbum error:", error);
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async deleteAlbum(req, res) {
    const data = req.body;
    const id = data.id;
 
    try {
      const File = await GalleryModel.GetAlum(id);
      // return res.status(200).json(File);
      const deleteAws = await deleteFiles(File);

      if (deleteAws[0].status == 1) {
        const result = await GalleryModel.deleteGallery(id);
        if (result) {
          return res.status(200).json({ status: "success", result });
        } else {
          return res.status(200).json({ status: "error", result });
        }
      } else {
        return res.status(200).json({ status: "error", result });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json(error);
    }
  }

  
}
module.exports = GalleryController;
