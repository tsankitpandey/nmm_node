const BaseModel=require('./BaseModel');

class NewsNMMModel extends BaseModel{

    static async NewsIndex12() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM nmm_banner, nmm_news`;

            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching filtered news:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async NewsIndex() {
        return new Promise((resolve, reject) => {
            const query1 = "SELECT * FROM nmm_banner";
            const query2 = `
            SELECT nmm_news.*, nmm_category.type 
            FROM nmm_news
            INNER JOIN nmm_category ON nmm_news.category_id = nmm_category.id
            ORDER BY nmm_news.created_at DESC
        `;
            
            super.db.query(query1, (err1, banners) => {
                if (err1) {
                    console.error("Error fetching banners:", err1);
                    return reject(err1);
                }
    
                super.db.query(query2, (err2, news) => {
                    if (err2) {
                        console.error("Error fetching news:", err2);
                        return reject(err2);
                    }
    
                    // Merge results into an object
                    resolve({ banners, news });
                });
            });
        });
    }
    
    
    static async NewsList() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT nmm_news.*, 
                nmm_category.type 
                FROM nmm_news
                INNER JOIN nmm_category ON nmm_news.category_id = nmm_category.id
                `; 
          
            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching filtered news:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async NewsAdd() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, type FROM nmm_category'; 
          
            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching filtered news:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async NewsSave(data, image) {
        const timestamp = Math.floor(Date.now() / 1000); 
        
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO nmm_news (title, priority, image, category_id, date, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [data.title, data.priority, image[0].thumbUrl, data.category_id, data.date, data.description, timestamp];
            
            
            super.db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error executing query1:', err);
                    return reject(err); 
                }
                resolve(result); 
            });
        });
    }

    static async NewsUpdate(id, title, priority, category_id, date, description, image) {
       
        const timestamp = Math.floor(Date.now() / 1000); 

        return new Promise((resolve, reject) => {
            let query;
            let values;

          if(image){
             query = `
                UPDATE nmm_news 
                SET 
                    title = ?, 
                    priority = ?, 
                    image = ?,
                    category_id = ?,
                    date = ?,
                    description = ?,
                    updated_at = ?
                WHERE 
                    id = ?`;
    
             values = [title, priority, image, category_id, date, description, timestamp, id];

          }else{

            query = `
                UPDATE nmm_news 
                SET 
                    title = ?, 
                    priority = ?, 
                    category_id = ?,
                    date = ?,
                    description = ?,
                    updated_at = ?
                WHERE 
                    id = ?`;

             values = [title, priority, category_id, date, description, timestamp, id];
          }
    
            super.db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error executing update query:', err);
                    return reject({ error: 'Error updating news details', details: err });
                }
    
                resolve(results);
            });
        });
    }

    static async BannerSave(data, image) {

        const timestamp = Math.floor(Date.now() / 1000); 
    
        return new Promise((resolve, reject) => {
            
            const query = 'INSERT INTO nmm_banner (image, title, priority,  display, popup, button_text, button_link, description, content, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [image[0].thumbUrl, data.title, data.priority, data.display, data.popup, data.button_text, data.button_link,  data.description, data.content, timestamp];
    
            super.db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error executing query1:', err);
                    return reject(err); 
                }
                resolve(result); 
            });
        });
    }

    static async NewsDelete(id) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM nmm_news
                WHERE id = ?`;
    
            super.db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error executing delete query:', err);
                    return reject({ error: 'Error deleting event', details: err });
                }
    
                resolve(results);
            });
        });
    }
    
    static async bannerIndex() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM nmm_banner`
            // console.error("dd",query);
            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching filtered banner:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async BannerDelete(id) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM nmm_banner
                WHERE id = ?`;
    
            super.db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error executing delete query:', err);
                    return reject({ error: 'Error deleting banner', details: err });
                }
    
                resolve(results);
            });
        });
    }

    static async BannerUpdate(id, title, priority, display, popup, button_text, button_link, description, content, image) {
        const timestamp = Math.floor(Date.now() / 1000); 
        
        return new Promise((resolve, reject) => {
            let query;
            let values;
            
            if(image){
                query = `
                UPDATE nmm_banner 
                SET 
                image = ?,
                title = ?, 
                priority = ?, 
                display = ?,
                popup = ?,
                button_text = ?,
                button_link = ?,
                description = ?,
                content = ?,
                updated_at = ?
                WHERE 
                id = ?`;
                
                values = [image, title, priority, display, popup, button_text, button_link, description, content, timestamp, id];
                // console.error('getting data:', values);

            }else{

            query = `
                UPDATE nmm_banner 
                SET 
                    title = ?, 
                    priority = ?, 
                    display = ?,
                    popup = ?,
                    button_text = ?,
                    button_link = ?,
                    description = ?,
                    content = ?,
                    updated_at = ?
                WHERE 
                    id = ?`;

             values = [title, priority, display, popup, button_text, button_link, description, content, timestamp, id];
          }
    
            super.db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error executing update query:', err);
                    return reject({ error: 'Error updating news details', details: err });
                }
    
                resolve(results);
            });
        });
    }

}

module.exports = NewsNMMModel;