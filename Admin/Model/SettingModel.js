const BaseModel=require('./BaseModel');
class SettingModel extends BaseModel {

    static async SettingIndex() {
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
            const query3 ="SELECT * FROM account_setting";
            
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
                
                super.db.query(query3, (err3, account) => {
                    if (err3) {
                        console.error("Error fetching email:", err3);
                        return reject(err3);
                    }
                    resolve({ Standard, custom, account });
                });
            });
            });
        });
    }
}

module.exports = SettingModel;