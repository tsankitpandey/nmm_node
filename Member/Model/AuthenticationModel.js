const BaseModel=require('./BaseModel');

class AuthenticationModel extends BaseModel{
    static async loginVerify(email, password ){
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM member WHERE email = '${email}' AND password = '${password}'`;
            
            super.db.query(query,  (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async signup (data){
        return new Promise((resolve, reject) => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
                const query = `INSERT INTO membership_request 
                      (first_name, last_name, country, email, country_code, contact,created_at) 
                    VALUES (?, ?, ?, ?, ?, ?,?)`;
    
                const values = [
                    data.first_name, 
                    data.last_name, 
                    data.member_country, 
                    data.email, 
                    data.country_code, 
                    data.contact_number,
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
    


}
module.exports=AuthenticationModel;