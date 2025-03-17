const BaseModel=require('./BaseModel');

class AuthenticationModel extends BaseModel{
    static async loginVerify(email, password ){
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM member WHERE email = '${email}' AND password = '${password}'`;
            
            super.db.query(query,  (err, result) => {

                if (err) {
                    return reject(err);
                }

                const query2 = `SELECT 
                    membership_plans.*
                FROM 
                    member 
                INNER JOIN 
                    company ON company.id = member.company_id
                INNER JOIN 
                    membership_plans ON membership_plans.id = SUBSTRING_INDEX(company.member_plan, ':', 1) 
                WHERE 
                    member.email = '${email}' 
                    AND member.password = '${password}';`;
                
                super.db.query(query2,  (err, result2) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log(result2[0])
                    delete result2[0].description;
                    resolve({member:result[0],membership_plan:result2[0]});
                });    
               
            });
        });
    }

    static async signup(data, image) {
        return new Promise((resolve, reject) => {
            try {
                const timestamp = Math.floor(Date.now() / 1000);
    
               
                const removeEmojis = (text) => text.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, '').trim();
    
               
                const contact = removeEmojis(data.contact);
                const telephone = removeEmojis(data.telephone);
    
              
                const memberBirthday = data.member_birthday ? Math.floor(new Date(data.member_birthday).getTime() / 1000) : null;
                const companyEstablishmentDate = data.companyEstablishmentDate ? Math.floor(new Date(data.companyEstablishmentDate).getTime() / 1000) : null;
    
                const memberQuery = `INSERT INTO membership_request 
                    (first_name, last_name, job_tittle, country, email, contact_country_code, contact_number, birth_date, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const memberValues = [
                    data.member_firstName,
                    data.member_lastName,
                    data.member_jobTitle,
                    data.member_Country,
                    data.member_email,
                    contact, 
                    data.member_contactNumber,
                    memberBirthday,
                    timestamp
                ];
    
                super.db.query(memberQuery, memberValues, (err, memberResult) => {
                    if (err) {
                        console.error("Membership Request Insert Error:", err, "\nQuery:", memberQuery, "\nValues:", memberValues);
                        return reject({ success: false, message: "Failed to insert into membership_request", error: err });
                    }
    
                    const membershipId = memberResult.insertId;
    
                    const companyQuery = `INSERT INTO company_request 
                        (member_id, company_name, company_email, country_code, contact_number, city, number_employees, establish_date, membership_plan, Adress_company, about_company, company_logo, created_at) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
                    const companyValues = [
                        membershipId,
                        data.companyName,
                        data.email,
                        telephone, 
                        data.company_telephone,
                        data.city,
                        data.numEmployees || 0,
                        companyEstablishmentDate,
                        data.membershipPlan,
                        data.companyAddress,
                        data.aboutCompany,
                        image[0]?.thumbUrl || null,
                        timestamp
                    ];
    
                    super.db.query(companyQuery, companyValues, (err, companyResult) => {
                        if (err) {
                            console.error("Company Request Insert Error:", err, "\nQuery:", companyQuery, "\nValues:", companyValues);
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