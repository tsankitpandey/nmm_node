const BaseModel=require('./BaseModel');

class AuthenticationModel extends BaseModel{
    static async loginVerify(username, password ){
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM member WHERE username = '${username}' AND password = '${password}'`;
            
            super.db.query(query,  (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

}
module.exports=AuthenticationModel;