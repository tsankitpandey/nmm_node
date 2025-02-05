const BaseModel=require('./BaseModel');
class NewsNMMModel extends BaseModel{

    static async NewsList() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM nmm_news'; 
          
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

}

module.exports = NewsNMMModel;