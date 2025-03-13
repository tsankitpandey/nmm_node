const BaseModel=require('./BaseModel');
class EmailTemModel extends BaseModel {

    static async EmailTemIndex() {
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

    static async CustomTemSave(data) {
        const timestamp = Math.floor(Date.now() / 1000); 
    
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO email (purpose, email_type, subject, \`from\`, message, type, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [data.purpose, data.email_type, data.subject, data.from, data.message, data.type, data.status, timestamp];
    
            super.db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error executing query1:', err);
                    return reject(err); 
                }
                console.log("Insert result:", result); 
                resolve(result); 
            });
        });
    }
    static async updateEmailTem(id, purpose, subject, from, message) {
        const timestamp = Math.floor(Date.now() / 1000);
        return new Promise((resolve, reject) => {
    
            const query = `
                UPDATE email 
                SET 
                    purpose = ?, 
                    \`from\` = ?, 
                    subject = ?, 
                    message = ?, 
                    updated_at = ?
                WHERE 
                    id = ?;
            `;

            super.db.query(query, [purpose, from, subject, message, timestamp, id], (err, results) => {
                if (err) {
                    console.error("Error updating email by ID:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async CustomTemUpdate(id, purpose, subject, from, message) {
        const timestamp = Math.floor(Date.now() / 1000);
        return new Promise((resolve, reject) => {
    
            const query = `
                UPDATE email 
                SET 
                    purpose = ?, 
                    \`from\` = ?, 
                    subject = ?, 
                    message = ?, 
                    updated_at = ?
                WHERE 
                    id = ?;
            `;

            super.db.query(query, [purpose, from, subject, message, timestamp, id], (err, results) => {
                if (err) {
                    console.error("Error updating email by ID:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async ActivateTemEmail(ids) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(ids) || ids.length === 0) {
                return reject(new Error("Invalid ID list"));
            }
    
            const placeholders = ids.map(() => "?").join(","); // Create placeholders like "?, ?, ?"
            const query = `
                UPDATE email 
                SET status = 1 
                WHERE id IN (${placeholders}) AND status IN (0, 1);
            `;
    
            super.db.query(query, ids, (err, results) => {
                if (err) {
                    console.error("Error updating email status:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    static async DeactivateTemEmail(ids) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(ids) || ids.length === 0) {
                return reject(new Error("Invalid ID list"));
            }
    
            const placeholders = ids.map(() => "?").join(","); // Create placeholders like "?, ?, ?"
            const query = `
                UPDATE email 
                SET status = 0 
                WHERE id IN (${placeholders}) AND status IN (0, 1);
            `;
    
            super.db.query(query, ids, (err, results) => {
                if (err) {
                    console.error("Error updating email status:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static async DeleteTemEmail(ids) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(ids) || ids.length === 0) {
                return reject(new Error("Invalid ID list"));
            }
    
            const placeholders = ids.map(() => "?").join(","); // Create placeholders like "?, ?, ?"
            const query = `DELETE FROM email WHERE id IN (${placeholders})`;
    
            super.db.query(query, ids, (err, results) => {
                if (err) {
                    console.error("Error deleting emails:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
        
static async getTemplatesByIds(templateIds) {
        return new Promise((resolve, reject) => {
            if (!Array.isArray(templateIds) || templateIds.length === 0) {
                return reject(new Error('Invalid template IDs'));
            }

            const placeholders = templateIds.map(() => '?').join(',');
            const query = `SELECT content FROM email WHERE id IN (${placeholders})`;

            db.query(query, templateIds, (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
}

module.exports = EmailTemModel;
