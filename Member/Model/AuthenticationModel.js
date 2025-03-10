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

    static async signup(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
    
                // Remove emoji characters from country codes
                data.contact = data.contact.replace(/[\uD800-\uDFFF]./g, '').trim(); 
                data.mobile = data.mobile.replace(/[\uD800-\uDFFF]./g, '').trim();
                data.telephone = data.telephone.replace(/[\uD800-\uDFFF]./g, '').trim(); 
    
                const memberQuery = `INSERT INTO membership_request 
                    (first_name, last_name, job_tittle, country, email, contact_country_code, contact_number, mobile_country_code, mobile_number, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const memberValues = [
                    data.member_firstName,
                    data.member_lastName,
                    data.member_jobTitle,
                    data.member_Country,
                    data.member_email,
                    data.contact, 
                    data.member_contactNumber,
                    data.mobile, 
                    data.member_mobile,
                    timestamp
                ];
    
                super.db.query(memberQuery, memberValues, (err, memberResult) => {
                    if (err) {
                        console.error("Membership Request Insert Error:", err);
                        return reject({ success: false, message: "Failed to insert into membership_request", error: err });
                    }
    
                    const membershipId = memberResult.insertId;
    
                    const companyQuery = `INSERT INTO company_request 
                        (member_id, company_name, company_email, country_code, contact_number, branches, city, number_employees, establish_date, membership_plan, Adress_company, about_company, company_logo, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                    const companyValues = [
                        membershipId,
                        data.companyName,
                        data.email,
                        data.telephone, 
                        data.company_telephone,
                        data.branches,
                        data.city,
                        data.numEmployees || 0,
                        data.companyEstablishmentDate,
                        data.membershipPlan,
                        data.companyAddress,
                        data.aboutCompany,
                        image[0].thumbUrl,
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