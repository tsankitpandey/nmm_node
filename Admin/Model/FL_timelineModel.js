const BaseModel = require("./BaseModel");

class FL_timelineModel extends BaseModel {
    static async insert(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);

                if (!image || image.length === 0) {
                    return reject({ success: false, message: "No image provided." });
                }

                const query = `
                    INSERT INTO FL_Timeline 
                    ( textarea, file_url, file_extension, created_at) 
                    VALUES ( ?, ?, ?, ?)`;

                const values = [
                    
                    data.textarea,
                    image[0].thumbUrl,
                    image[0].fieldName,
                    timestamp
                ];

                super.db.query(query, values, (err, result) => {
                    if (err) {
                        console.error("Database Error:", err);
                        return reject({ success: false, message: "Database insertion failed", error: err });
                    }
                    
                    resolve({
                        success: true,
                        message: "Data inserted successfully",
                      result 
                    });
                });

            } catch (error) {
                console.error("Insert Error:", error);
                reject({ success: false, message: "Unexpected error occurred", error });
            }
        });
    }

    static async updatetimeline(data, feedId) {
        return new Promise((resolve, reject) => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
      
                const query = `
                    UPDATE FL_Timeline 
                    SET textarea = ?
                    WHERE id = ?`;
    
             
                const values = [ data.textarea,feedId];
    
               
                super.db.query(query, values, (err, result) => {
                    if (err) {
                        console.error("Database Error:", err);
                        return reject({ success: false, message: "Database update failed", error: err });
                    }
                    
                  
                    resolve({
                        success: true,
                        message: "Timeline updated successfully",
                        result
                    });
                });
    
            } catch (error) {
                console.error("Update Error:", error);
                reject({ success: false, message: "Unexpected error occurred", error });
            }
        });
    }
    

    static async fetchAllFeeds() {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    SELECT id, textarea, file_url, file_extension, created_at 
                    FROM FL_Timeline
                    ORDER BY created_at DESC`; 
    
                super.db.query(query, (err, results) => {
                    if (err) {
                        console.error("Database Error:", err);
                        return reject({ success: false, message: "Database fetch failed", error: err });
                    }
    
                    resolve({
                        success: true,
                        message: "Feeds fetched successfully",
                        feeds: results
                    });
                });
    
            } catch (error) {
                console.error("Fetch Error:", error);
                reject({ success: false, message: "Unexpected error occurred", error });
            }
        });
    }

    static async DeleteFeeds(feedId) {

        return new Promise((resolve, reject) => {
            try {
            //   resolve(feedId)
                const query = 'DELETE FROM FL_Timeline WHERE id = ?';
    
              
                super.db.query(query, [feedId], (error, results) => {
                    if (error) {
                        reject({ success: false, message: 'Error deleting feed', error: error });
                    } else {
                        if (results.affectedRows > 0) {
                            resolve({ success: true, message: 'Feed deleted successfully' });
                        } else {
                            reject({ success: false, message: 'Feed not found or already deleted' });
                        }
                    }
                });
            } catch (error) {
                reject({ success: false, message: 'Unexpected error occurred', error: error });
            }
        });
    
}
}

module.exports = FL_timelineModel;
