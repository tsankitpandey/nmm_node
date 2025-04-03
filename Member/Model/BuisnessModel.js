const { query } = require('../../Utils/db');
const BaseModel = require('./BaseModel');

class BusinessModel extends BaseModel {

    static async insertTransaction(data, receiver_id, sender_id) {
        const timestamp = Math.floor(Date.now() / 1000);
    
        try {
          
            const [senderResult, receiverResult] = await Promise.all([
                this.queryDB(`SELECT wallet_balance FROM company WHERE id = ?`, [sender_id]),
                this.queryDB(`SELECT wallet_balance FROM company WHERE id = ?`, [receiver_id])
            ]);
    
            if (!senderResult.length || !receiverResult.length) {
                throw new Error("Sender or receiver not found.");
            }
    
            const senderBalance = Number(senderResult[0].wallet_balance);
            const receiverBalance = Number(receiverResult[0].wallet_balance);
    
            if (senderBalance < data.Amount) {
                throw new Error("Insufficient balance.");
            }
    
            const senderUpdatedBalance = senderBalance - data.Amount;
            const receiverUpdatedBalance = receiverBalance + Number(data.Amount);
    
           
            await Promise.all([
                this.queryDB(`UPDATE company SET wallet_balance = ? WHERE id = ?`, [senderUpdatedBalance, sender_id]),
                this.queryDB(`UPDATE company SET wallet_balance = ? WHERE id = ?`, [receiverUpdatedBalance, receiver_id])
            ]);
    
           
            const walletLogQuery = `
                INSERT INTO wallet_amount_log 
                (sender_id, receiver_id, amount, sender_final_wallet, receiver_final_wallet, admin_comment, status, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const logValues = [
                sender_id, receiver_id, data.Amount, senderUpdatedBalance, receiverUpdatedBalance, data.Comment, data.status, timestamp
            ];
    
            const walletLogResult = await this.queryDB(walletLogQuery, logValues);
            const wallet_id = walletLogResult.insertId;
    
           
            const walletTranQuery = `
                INSERT INTO wallet_transaction_details 
                (wallet_id, transaction_mode, transaction_date, chequenumber, offline_mode, admin_comment, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const tranValues = [
                wallet_id, data.Transaction_Mode.value, data.Transaction_Date, data.chequenumber, data.offline_mode, data.Comment, timestamp
            ];
    
            const walletTranResult = await this.queryDB(walletTranQuery, tranValues);
            return walletTranResult;
        } catch (error) {
            throw error;
        }
    }
    
    static async getTransaction(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    wal.*, 
                    sender.company_name AS sender_company_name, 
                    receiver.company_name AS receiver_company_name, 
                    receiver.wallet_balance
                FROM wallet_amount_log wal
                JOIN company sender ON wal.sender_id = sender.id
                JOIN company receiver ON wal.receiver_id = receiver.id
                WHERE wal.sender_id = ${id}`;
    
            super.db.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    
    
   
    static queryDB(query, params) {
        return new Promise((resolve, reject) => {
            super.db.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
    
}
module.exports = BusinessModel;