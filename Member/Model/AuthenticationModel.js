const BaseModel=require('./BaseModel');

class AuthenticationModel extends BaseModel{
    static async loginVerify(username, password ){
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
            
            super.db.query(query,  (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    }

}
module.exports=AuthenticationModel;