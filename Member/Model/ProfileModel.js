const BaseModel=require('./BaseModel');
class ProfileModel extends BaseModel{

    static async profileGet(post) {
        return new Promise((resolve, reject) => {

            const query1 = `SELECT * FROM member WHERE company_id = ${post.company_id}`;
            const query4 = `SELECT member.*,
            concat(member.first_name, ' ' ,member.middle_name, ' ' ,member.last_name) As full_name
            FROM member 
            WHERE id = ${post.userId}`;
            const query2 = `SELECT * FROM company WHERE id = ${post.company_id}`;
            const query3 = `
                SELECT 
                    services.icon_url, 
                    services.service_name, 
                    services.id 
                FROM company
                INNER JOIN services ON FIND_IN_SET(services.id, company.service) > 0
                WHERE company.id = ${post.company_id}`;
    
            Promise.all([
                new Promise((resolve, reject) => {
                    super.db.query(query1, (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    super.db.query(query2, (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    super.db.query(query3, (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                }),
                new Promise((resolve, reject) => {
                    super.db.query(query4, (err, results) => {
                        if (err) return reject(err);
                        resolve(results);
                    });
                })
            ])
            .then(([memberData, companyData, servicesData ,loginMember]) => {
                
                
                resolve({
                    member_data: memberData || [],
                    company_data: companyData[0] || [],
                    services: servicesData || [],
                    loginMember:loginMember[0] || []
                });
            })
            .catch(error => {
                console.error(" Database Query Error:", error);
                reject(error);
            });
        });
    }
    

    

    static async UpdateCompanyLogo(file, post) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE company SET company_logo = ? WHERE id = ?`;
    
            const logoUrl = file[0].thumbUrl ; 
    
            super.db.query(query, [logoUrl, post.company_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async UpdateCompanyBanner(file, post) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE company SET company_banner = ? WHERE id = ?`;
    
            const logoUrl = file[0].thumbUrl ; 
    
            super.db.query(query, [logoUrl, post.company_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async SocialUpdate(post) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE company SET facebook_url = ?,twitter_url = ?,linkedIn_url = ?,instagram_url= ?
             WHERE id = ?`;

            super.db.query(query, [post.facebook,post.twitter,post.linkedin,post.instagram,post.company_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async EditIntro(data) {
        return new Promise((resolve, reject) => {
         
          const foundationTimestamp = Math.floor(new Date(data.foundationDate).getTime() / 1000);
      
          const query = `
            UPDATE company 
            SET 
              bio = ?, 
              foundation_date = ? 
            WHERE id = ?
          `;
      
          const values = [data.memberBio, foundationTimestamp, data.company_id];
      
          super.db.query(query, values, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }

      static async updateMember(data) {
        return new Promise((resolve, reject) => {
          let query;
          let values;
      
         
          data.CountryCode = data.CountryCode.replace(/[^\x00-\x7F]/g, "").trim();
      
         
          const hasProfilePic =
            data.ProfilePicture &&
            (typeof data.ProfilePicture === "string" ||
              (typeof File !== "undefined" && data.ProfilePicture instanceof File));
      
          if (hasProfilePic) {
            query = `
              UPDATE member
              SET first_name = ?, middle_name = ?, last_name = ?, member_logo = ?, 
                  job_title = ?, department = ?, country_code = ?, contact = ?
              WHERE id = ?
            `;
      
            values = [
              data.FirstName,
              data.MiddleName,
              data.LastName,
              typeof data.ProfilePicture === "string" ? data.ProfilePicture : "", 
              data.JobTitle,
              data.Department,
              data.CountryCode,
              data.PhoneDirect,
              data.member_id,
            ];
          } else {
            query = `
              UPDATE member
              SET first_name = ?, middle_name = ?, last_name = ?, 
                  job_title = ?, department = ?, country_code = ?, contact = ?
              WHERE id = ?
            `;
      
            values = [
              data.FirstName,
              data.MiddleName,
              data.LastName,
              data.JobTitle,
              data.Department,
              data.CountryCode,
              data.PhoneDirect,
              data.member_id,
            ];
          }
      
          // Execute the query
          super.db.query(query, values, (err, result) => {
            if (err) {
              console.error("Error updating member:", err);
              return reject(err);
            }
            resolve(result);
          });
        });
      }
      
      
      
      
      
      
    
    
  

}
module.exports= ProfileModel;