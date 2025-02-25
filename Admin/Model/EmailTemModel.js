const BaseModel=require('./BaseModel');
class EmailTemModel extends BaseModel {

    static async EmailIndex() {
        return new Promise((resolve, reject) => {
            const query1 = `
                SELECT email.* 
                FROM email 
                WHERE email.type = 'Standard';
            `;
            const query2 = `
                SELECT email.* 
                FROM email 
                WHERE email.type = 'custom';
            `;
            
            super.db.query(query1, (err1, Standard) => {
                if (err1) {
                    console.error("Error fetching email:", err1);
                    return reject(err1);
                }
    
                super.db.query(query2, (err2, custom) => {
                    if (err2) {
                        console.error("Error fetching email:", err2);
                        return reject(err2);
                    }
                    resolve({ Standard, custom});
                });
            });
        });
    }

    static async EmailIndex_2() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT email.* 
                FROM email 
                WHERE email.type = 'custom';
            `;
            
            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching filtered email:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    } 
    
}

module.exports = EmailTemModel;
