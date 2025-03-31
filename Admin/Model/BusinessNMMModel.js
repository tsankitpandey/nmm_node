const BaseModel=require('./BaseModel');

class BusinessNMMModel extends BaseModel{

    static async ViewIndex() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT wallet_amount_log.*, 
                company.wallet_balance,
                company.company_name 
                FROM wallet_amount_log
                INNER JOIN company ON wallet_amount_log.receiver_id = company.id
                `; 
          
            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Error fetching filtered list:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
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
                    // console.log(result.from_company); 
                    resolve(result);
                }
            });
        });
    }
      
    static async TransactionSave(data, receiver_id, sender_id) {
        const timestamp = Math.floor(Date.now() / 1000);
    
        return new Promise((resolve, reject) => {
           
            const senderQuery = `SELECT wallet_balance FROM company WHERE id = ?`;
            super.db.query(senderQuery, [sender_id], (err, senderResults) => {
                if (err) {
                    console.error("Error fetching sender's wallet balance:", err);
                    return reject(err);
                }
                const senderWallet = parseInt(senderResults[0]?.wallet_balance || 0);
               console.log(senderWallet,"sender");
                const receiverQuery = `SELECT wallet_balance FROM company WHERE id = ?`;
                super.db.query(receiverQuery, [receiver_id], (err, receiverResults) => {
                    if (err) {
                        console.error("Error fetching receiver's wallet balance:", err);
                        return reject(err);
                    }
                    const receiverWallet = parseInt(receiverResults[0]?.wallet_balance || 0);
                    console.log(receiverWallet,"receiverWallet");
                    const newSenderWallet = senderWallet - data.amount;
                    console.log(newSenderWallet,"newSenderWallet");
                    const newReceiverWallet = receiverWallet + parseInt(data.amount);
                    console.log(newReceiverWallet,"newReceiverWallet");
                    const updateSenderQuery = `UPDATE company SET wallet_balance = ? WHERE id = ?`;
                    super.db.query(updateSenderQuery, [newSenderWallet, sender_id], (err) => {
                        if (err) {
                            console.error("Error updating sender's balance:", err);
                            return reject(err);
                        }
    
                        const updateReceiverQuery = `UPDATE company SET wallet_balance = ? WHERE id = ?`;
                        super.db.query(updateReceiverQuery, [newReceiverWallet, receiver_id], (err) => {
                            if (err) {
                                console.error("Error updating receiver's balance:", err);
                                return reject(err);
                            }
    
                            const walletLogQuery = `
                                INSERT INTO wallet_amount_log 
                                (sender_id, receiver_id, amount, sender_final_wallet, receiver_final_wallet, admin_comment, status, created_at) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                            const logValues = [
                                sender_id,
                                receiver_id,
                                data.amount,
                                newSenderWallet,
                                newReceiverWallet,
                                data.admin_comment,
                                data.status,
                                timestamp
                            ];
    
                            super.db.query(walletLogQuery, logValues, (err, walletAmResult) => {
                                if (err) {
                                    console.error("Error inserting wallet log:", err);
                                    return reject(err);
                                }
    
                                const wallet_id = walletAmResult.insertId;
    
                                const walletTranQuery = `
                                    INSERT INTO wallet_transaction_details 
                                    (wallet_id, transaction_mode, transaction_date, chequenumber, offline_mode, admin_comment, created_at) 
                                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
                                const tranValues = [
                                    wallet_id,
                                    data.transaction_mode,
                                    data.transaction_date,
                                    data.chequenumber,
                                    data.offline_mode,
                                    data.admin_comment,
                                    timestamp
                                ];
    
                                super.db.query(walletTranQuery, tranValues, (err, walletTranResult) => {
                                    if (err) {
                                        console.error("Error inserting transaction details:", err);
                                        return reject(err);
                                    }
    
                                    resolve(
                                        walletAmResult,
                                        walletTranResult,
                                        newSenderWallet,
                                        newReceiverWallet
                                    );
                                    console.log("Transaction Saved Successfully:", walletTranResult);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    static async ViewModel(id) {
        return new Promise((resolve, reject) => {
            try {
                const query = `
                    SELECT 
                        wallet_amount_log.amount AS amount,
                        wallet_amount_log.receiver_id AS receiver_id,
                        wallet_amount_log.sender_id AS sender_id,
                        wallet_amount_log.admin_comment AS admin_comment,
                        wallet_amount_log.member_comment AS member_comment,
                        wallet_amount_log.status AS status,
                        wallet_amount_log.receiver_final_wallet AS receiver_final_wallet,
                        wallet_amount_log.created_at AS created_at,
                        wallet_amount_log.sender_final_wallet AS sender_final_wallet,
                        GROUP_CONCAT(CONCAT_WS(":", company.id, company.company_name) SEPARATOR ",") 
                            AS sender_receiver_company_name
                    FROM wallet_amount_log
                    INNER JOIN company 
                        ON company.id = wallet_amount_log.sender_id 
                        OR company.id = wallet_amount_log.receiver_id
                    WHERE wallet_amount_log.sender_id = ? 
                        OR wallet_amount_log.receiver_id = ?
                    GROUP BY wallet_amount_log.id
                    ORDER BY wallet_amount_log.id DESC;
                `; 
    
                super.db.query(query, [id, id], (err, results) => {
                    if (err) {
                        console.error("Error fetching filtered list:", err);
                        return reject(err);
                    }
                    resolve(results);
                    // console.log([id, id]);
                });
    
            } catch (err) {
                console.error("Unexpected error:", err);
                reject(err);
            }
        });
    }
    
    
    
        
    
    

}
module.exports = BusinessNMMModel;