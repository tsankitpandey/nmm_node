const BaseModel=require('./BaseModel');
class UD_membershipReqModel extends BaseModel {

    static async MembershipReqIndex() {

        return new Promise((resolve, reject) => {

            const query = "SELECT * FROM membership_request;";

            super.db.query(query, (err1, result) => {
                if (err1) {
                    console.error("Error fetching membership request:", err1);
                    return reject(err1);
                }
                resolve(result);
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

    static async MembershipReqApprove(id) {
        const timestamp = Math.floor(Date.now() / 1000);
    
        return new Promise((resolve, reject) => {
            
            const query = `SELECT * FROM membership_request WHERE id = ?`;
            super.db.query(query, [id], async (err, results) => {
                if (err) return reject({ error: 'Error fetching membership request', details: err });
    
                const memberData = results[0];
                const membershipRequestId = memberData.id;
                const plainPassword = `100${membershipRequestId}00`;
    
                const query1 = `
                    SELECT company_request.*, membership_request.* 
                    FROM company_request
                    JOIN membership_request ON company_request.member_id = membership_request.id  
                    WHERE membership_request.id = ?;
                `;
    
                super.db.query(query1, [id], (err, company) => {
                    if (err) return reject({ error: 'Error fetching company data', details: err });
    
                    const companyData = company[0];
                    const companyName = companyData.company_name;

                    const insertMember = `
                        INSERT INTO member 
                        (first_name, last_name, company_name, country, email, password, country_code, contact, mobile_country_code, mobile_number, login_attempt, created_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
    
                    const memberValues = [
                        memberData.first_name,
                        memberData.last_name,
                        companyName,
                        memberData.country,
                        memberData.email,
                        plainPassword,
                        memberData.contact_country_code,
                        memberData.contact_number,
                        memberData.mobile_country_code,
                        memberData.mobile_number,
                        '0',
                        timestamp
                    ];
    
                    super.db.query(insertMember, memberValues, (err, insertMemberResult) => {
                        if (err) return reject({ error: 'Error inserting Member', details: err });

                        const insertCompany = `
                            INSERT INTO company 
                            (member_id, company_name, company_email, country_code, contact_number, branches, city, number_employees, establish_date, membership_plan, Adress_company, about_company, created_at)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
    
                        const companyValues = [
                            companyData.member_id,
                            companyData.company_name,
                            companyData.company_email,
                            companyData.country_code,
                            companyData.contact_number,
                            companyData.branches,
                            companyData.city,
                            companyData.number_employees,
                            companyData.establish_date,
                            companyData.membership_plan,
                            companyData.Adress_company,
                            companyData.about_company,
                            timestamp
                        ];
    
                        super.db.query(insertCompany, companyValues, (err, insertCompanyResult) => {
                            if (err) return reject({ error: 'Error inserting Company', details: err });

                            const deleteComp = `DELETE FROM company_request WHERE member_id = ?`;
    
                            super.db.query(deleteComp, [id], (err, deleteCompResult) => {
                                if (err) return reject({ error: 'Error deleting Company Request', details: err });

                            const deleteQuery = `DELETE FROM membership_request WHERE id = ?`;
    
                            super.db.query(deleteQuery, [id], (err, deleteResult) => {
                                if (err) return reject({ error: 'Error deleting Membership Request', details: err });
    
                                resolve({
                                    insertMemberResult,
                                    insertCompanyResult,
                                    deleteCompResult,
                                    deleteResult,
                                    generatedPassword: plainPassword
                                });
                            });
                        });
                        });
                    });
                });
            });
        });
    }
    
    static async updateMembershipDate(requestId,data) {
        const timestamp = Math.floor(Date.now() / 1000);
        return new Promise((resolve, reject) => {
    
            const query = `
                UPDATE membership_request 
                SET 
                membership_since = ?, 
                  membership_start = ?, 
                  membership_expire = ?, 
                    updated_at = ?
                WHERE 
                    id = ?;
            `;

            super.db.query(query, [data.membership_since, data.membership_start, data.membership_expire, timestamp, requestId], (err, results) => {
                if (err) {
                    console.error("Error updating MemberShip Date by ID:", err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async MembershipUpgradeIndex() {

        return new Promise((resolve, reject) => {

            const query = `
                SELECT membership_upgrade_request.*, 
                company.company_name, company.member_plan 
                FROM membership_upgrade_request
                INNER JOIN company ON membership_upgrade_request.company_id = company.id
                `; 

            super.db.query(query, (err1, result) => {
                if (err1) {
                    console.error("Error fetching membership Upgrade request:", err1);
                    return reject(err1);
                }
                resolve(result);
            });
        });
    } 

    static async MembershipUpgradeApprove(id) {
        const timestamp = Math.floor(Date.now() / 1000);
    
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM membership_upgrade_request WHERE id = ?`;
    
            super.db.query(query, [id], (err, results) => {
                if (err) {
                    
                    return reject({ error: 'Error fetching membership upgrade request', details: err });
                }
    
                console.log("✅ Query Results:", results); 
    
                if (!results || results.length === 0) {
                    
                    return reject({ error: 'No membership upgrade request found' });
                }
    
                const upgradeData = results[0];  
                console.log("Upgrade Data:", upgradeData);
    
                const insertUpgrade = `
                    INSERT INTO membership_log (company_id, purchase_date, membership, created_at)
                    VALUES (?, ?, ?, ?)
                `;
                
                const upgradeValues = [
                    upgradeData.company_id,
                    upgradeData.created_at,  
                    upgradeData.membership_id, 
                    timestamp
                ];
    
                console.log("🔹 Inserting into membership_log:", upgradeValues);
    
                super.db.query(insertUpgrade, upgradeValues, (err, insertUpgradeResult) => {
                    if (err) {
                        console.error("❌ Error inserting into membership_log:", err);
                        return reject({ error: 'Error inserting into membership_log', details: err });
                    }
    
                    console.log("✅ Inserted into membership_log:", insertUpgradeResult);
    
                    const logId = insertUpgradeResult.insertId;  
                    console.log("🔹 Membership Log ID:", logId);
    
                    const query1 = `SELECT * FROM membership_log WHERE id = ?`;
    
                    super.db.query(query1, [logId], (err, fetchData) => {
                        if (err) {
                            console.error("❌ Error fetching membership log:", err);
                            return reject({ error: 'Error fetching membership log', details: err });
                        }
    
                        if (!fetchData || fetchData.length === 0) {
                            console.error("❌ No membership log found for ID:", fetchData);
                            return reject({ error: 'No membership log found' });
                        }
                        fetchDataResult = fetchData[0];
                        console.log(fetchDataResult);
                        const upgradeCompany = `
                            UPDATE company 
                            SET 
                            member_plan = ?, 
                            membership_log_id = ?,  
                                updated_at = ?
                            WHERE 
                                id = ?;
                        `;
    
                        const companyValue = [
                            upgradeData.membership_id,
                            logId,
                            timestamp  
                            
                        ];
    
                        console.log("🔹 Inserting into company:", companyValue);
    
                        super.db.query(upgradeCompany, companyValue, (err, companyResult) => {
                            if (err) {
                                console.error("❌ Error inserting into company:", err);
                                return reject({ error: 'Error inserting into company', details: err });
                            }
    
                            console.log("✅ Inserted into company:", companyResult);
                            resolve({ insertUpgradeResult, companyResult });
                        });
                    });
                });
            });
        });
    }
    
    

    

}
module.exports = UD_membershipReqModel;