const BaseModel=require('./BaseModel');
class UD_membershipReqModel extends BaseModel {

    static async MembershipReqIndex() {

        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM membership_request;";

            super.db.query(query, (err1, request) => {
                if (err1) {
                    console.error("Error fetching membership request:", err1);
                    return reject(err1);
                }
                resolve({ request });
            });
        });
    } 

    static async MembershipReqDelete(id) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM membership_request
                WHERE id = ?`;
    
            super.db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Error executing delete query:', err);
                    return reject({ error: 'Error deleting Member Request', details: err });
                }
    
                resolve(results);
            });
        });
    }

    static async MembershipReqAprrove(id) {
        const timestamp = Math.floor(Date.now() / 1000);
    
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM membership_request WHERE id = ?`;
    
            super.db.query(query, [id], async (err, results) => {
                if (err) return reject({ error: 'Error fetching data', details: err });
    
                const memberData = results[0];
                const membershipRequestId = memberData.id;
                const plainPassword = `100${membershipRequestId}00`;
    
                const insert = `
                    INSERT INTO member (first_name, last_name, country, email, password, country_code, contact, login_attempt, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const values = [
                    memberData.first_name,
                    memberData.last_name,
                    memberData.country,
                    memberData.email,
                    plainPassword,
                    memberData.country_code,
                    memberData.contact,
                    '0',
                    timestamp
                ];
    
                super.db.query(insert, values, (err, insertResult) => {
                    if (err) return reject({ error: 'Error inserting Member', details: err });
    
                    const deleteQuery = `DELETE FROM membership_request WHERE id = ?`;
    
                    super.db.query(deleteQuery, [id], (err, deleteResult) => {
                        if (err) return reject({ error: 'Error deleting Membership Request', details: err });
    
                        resolve({ insertResult, deleteResult, generatedPassword: plainPassword });
                    });
                });
            });
        });
    }
    

    static async MembershipReqAprrove12(id) {

        const timestamp = Math.floor(Date.now() / 1000);

        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM membership_request WHERE id = ?`;

            super.db.query(query, [id], async (err, results) => {
            if (err) return reject({ error: 'Error fetching data', details: err });
            if (results.length === 0) return reject({ error: 'No member found' });
    
                const memberData = results[0];
                const membershipRequestId = memberData.id; 
    
                const plainPassword = `100${membershipRequestId}00`;
                
                const insertQuery = `
                    INSERT INTO member (first_name, last_name, country, email, password, country_code, contact, login_attempt, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const values = [
                    memberData.first_name,
                    memberData.last_name,
                    memberData.country,
                    memberData.email,
                    plainPassword,
                    memberData.country_code,
                    memberData.contact,
                    '0',
                    timestamp
                ];
    
                super.db.query(insertQuery, values, (err, insertResult) => {
                    if (err) return reject({ error: 'Error inserting Member', details: err });

                    const deleteQuery = `DELETE FROM membership_request WHERE id = ?`;

                    super.db.query(deleteQuery, [id], (err, deleteResult) => {
                        if (err) return reject({ error: 'Error deleting Membership Request', details: err });
    
                        resolve({ insertResult, deleteResult, generatedPassword: plainPassword });
                    });
                });
            });
        });
    }
    
    
    

    

}
module.exports = UD_membershipReqModel;