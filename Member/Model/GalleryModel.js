const BaseModel = require("./BaseModel");

class GalleryModel extends BaseModel {
  static async AlbumInsert(data, images) {
    return new Promise((resolve, reject) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const query1 = `INSERT INTO album (title, member_id, company_id,created_at) VALUES (?, ?, ?, ?)`;
      const values = [data.title, data.userid, data.companyid, timestamp];

      super.db.query(query1, values, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        const albumId = result.insertId;
        console.log(albumId, "albumId");

        const query2 = `INSERT INTO gallery (album_id, file_url, extension_type,created_at) VALUES ?`;

        const values2 = images.map((image) => [
          albumId,
          image.thumbUrl,
          image.extension,
          timestamp,
        ]);

        super.db.query(query2, [values2], (err1, result1) => {
          if (err1) {
            console.log(err1);
            return reject(err1);
          }
          resolve({ albumId, gallery: result1 });
        });
      });
    });
  }

  static async updateAlbum(data, images) {
    return new Promise((resolve, reject) => {
      const timestamp = Math.floor(Date.now() / 1000);
     
     
      const query1 = `UPDATE album SET title = ?, updated_at = ? WHERE id = ?`;
      const values = [data.title, timestamp, data.album_id];
  
      super.db.query(query1, values, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
  
       
        const query2 = `INSERT INTO gallery (album_id, file_url, extension_type, updated_at) VALUES ?`;
  
        const values2 = images.map((image) => [
          data.album_id,
          image.file_url,
          image.extension_type,
          timestamp,
        ]);
  
        if (values2.length === 0) {
        
          return resolve({ albumId: data.album_id, message: 'Album updated without new images' });
        }
  
        super.db.query(query2, [values2], (err1, result1) => {
          if (err1) {
            console.log(err1);
            return reject(err1);
          }
  
          resolve({ albumId: data.album_id, gallery: result1 });
        });
      });
    });
  }
  

  static async PhotoInsert(data, images) {
    return new Promise((resolve, reject) => {
      const timestamp = Math.floor(Date.now() / 1000);

      const query1 = `INSERT INTO media (member_id, company_id, tittle,file_url,extension_type,created_at) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [
        data.userid,
        data.companyid,
        data.title,
        images[0].thumbUrl,
        images[0].extension,
        timestamp,
      ];

      super.db.query(query1, values, (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async MediaGet(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM media WHERE media.company_id = ? ORDER BY media.id DESC`;
      super.db.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  static async AlbumGet(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, title FROM album WHERE company_id = ? ORDER BY id DESC`;
      super.db.query(query, [id], (err, albumResults) => {
        if (err) return reject(err);

        if (albumResults.length === 0) {
          return resolve([]);
        }

        const ids = albumResults.map((res) => res.id);

        const query1 = `SELECT * FROM gallery WHERE album_id IN (?)`;
        super.db.query(query1, [ids], (err1, galleryResults) => {
          if (err1) return reject(err1);

        
          const groupedGallery = galleryResults.reduce((acc, item) => {
            if (!acc[item.album_id]) {
              acc[item.album_id] = [];
            }
            acc[item.album_id].push(item);
            return acc;
          }, {});

         
          const finalResult = albumResults.map((album) => ({
            title: album.title,
            album_id: album.id.toString(),
            data: groupedGallery[album.id] || [],
          }));

          resolve(finalResult);
        });
      });
    });
  }

  static async deleteMedia(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM media WHERE id = ?`; 
  
      super.db.query(query, [id], (err, res) => {     
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static async deleteGallery(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM album WHERE id = ?`; 
      super.db.query(query, [id], (err, res) => {     
        if (err) {
          reject(err);
        } else {
          const query1 = `DELETE FROM gallery WHERE album_id = ?`; 
          super.db.query(query1,[id],(err1,res1)=>{
            if (err1) {
              reject(err1);
            } else {
              resolve(res1);
            }
          })
        }
      });
    });
  }
  

  static async GetFile(id) {
    return new Promise((resolve, reject) => {

            const query = `
                SELECT
                    media.file_url,
                    media.extension_type
                FROM media
                WHERE media.id = ${id}`;
            
           super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Database query error:", err); 
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    static async GetAlum(id) {
      return new Promise((resolve, reject) => {
  
              const query = `
                  SELECT
                      gallery.file_url,
                      gallery.extension_type
                  FROM gallery
                  WHERE gallery.album_id = ${id}`;
              
             super.db.query(query, (err, results) => {
                  if (err) {
                      console.error("Database query error:", err); 
                      return reject(err);
                  }
                  resolve(results);
              });
          });
      }

      static async AlbumDelete(id) {
        return new Promise((resolve, reject) => {
          const query = `
            DELETE FROM gallery
            WHERE album_id = ?`;
            resolve(id)
          super.db.query(query, [id], (err, result) => {
            if (err) {
              console.error("Database delete error:", err);
              return reject(err);
            }
            resolve(result); 
          });
        });
      }
      
}


module.exports = GalleryModel;
