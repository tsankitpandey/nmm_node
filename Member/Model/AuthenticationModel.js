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

    static async signup(data) {
        return new Promise((resolve, reject) => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
    
                data.member_countryCodeMobile = data.member_countryCodeMobile.replace(/[^\x00-\x7F]/g, '');
    
              
                const memberQuery = `INSERT INTO membership_request 
                    (first_name, last_name, job_tittle, country, email, contact_country_code, contact_number, mobile_country_code, mobile_number, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const memberValues = [
                    data.member_firstName || 'N/A',
                    data.member_lastName || 'N/A',
                    data.member_jobTitle || 'N/A',
                    data.member_Country || 'N/A',
                    data.member_email || 'N/A',
                    data.member_countryCode || '+00',
                    data.member_contactNumber || '0000000000',
                    data.member_countryCodeMobile,
                    data.member_mobile || '0000000000',
                    timestamp
                ];
    
                super.db.query(memberQuery, memberValues, (err, memberResult) => {
                    if (err) {
                        console.error("Membership Request Insert Error:", err);
                        return reject({ success: false, message: "Failed to insert into membership_request", error: err });
                    }
    
                    const membershipId = memberResult.insertId;
    
                 
                    const companyQuery = `INSERT INTO company_request 
                    (member_id, company_name, company_email, country_code, contact_number, branches, city, number_employees, establish_date, membership_plan, Adress_company, about_company, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                    const companyValues = [
                        membershipId,            
                        data.companyName || 'N/A',       
                        data.email || 'N/A',      
                        data.Company_countryCode = data.Company_countryCode.replace(/[\uD800-\uDFFF]./g, ''), 

                        data.company_telephone || '0000000000',
                        data.branches || 'N/A',       
                        data.city || 'N/A',  
                        data.numEmployees || 0,
                        data.companyEstablishmentDate || '2000-01-01', 
                        data.membershipPlan || 'Basic',    
                        data.companyAddress || 'N/A',   
                        data.aboutCompany || 'N/A',     
                        timestamp
                    ];
    
                    super.db.query(companyQuery, companyValues, (err, companyResult) => {
                        if (err) {
                            console.error("Company Request Insert Error:", err);
                            return reject({ success: false, message: "Failed to insert into company_request", error: err });
                        }
    
                        resolve({
                            success: true,
                            message: "Data inserted successfully in both tables",
                            membershipResult: memberResult,
                            companyResult: companyResult
                        });
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