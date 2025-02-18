const BaseModel=require('./BaseModel');

class BusinessNMMModel extends BaseModel{

    static async TransactionAdd() {
        
        return new Promise((resolve, reject) => {
            const query = `SELECT company_name, id AS company_id FROM company`
            // console.error("dd",query);
            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching company data:", err);
                    reject(err);
                } else {
                    const result = {
                        company: results,
                        from_company: results
                    };
                    console.log(result.from_company); // Debugging output like PHP's debug()
                    resolve(result);
                }
            });
        });
    }
      
    static async TransactionSave(data) {

        const timestamp = Math.floor(Date.now() / 1000); 
        
        return new Promise((resolve, reject) => {

            const query = 'INSERT INTO wallet_amount_log (sender_id, receiver_id, amount, sender_final_wallet, receiver_final_wallet, member_comment, admin_comment, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [sender_id, receiver_id, amount, sender_final_wallet, receiver_final_wallet, member_comment, admin_comment, status, timestamp];

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
module.exports = BusinessNMMModel;