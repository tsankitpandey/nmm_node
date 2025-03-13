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

    

    

}
module.exports = UD_membershipReqModel;