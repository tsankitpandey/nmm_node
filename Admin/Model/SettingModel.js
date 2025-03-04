const BaseModel=require('./BaseModel');
class SettingModel extends BaseModel {

    static async SettingIndex() {
        return new Promise((resolve, reject) => {

            const query1 = "SELECT id AS add_email_id, subject AS title FROM email;";
            const query2 = "SELECT * FROM account_setting;";
            const query3 = "SELECT * FROM alc_setting;";
    
            super.db.query(query1, (err1, emails) => {
                if (err1) {
                    console.error("Error fetching email:", err1);
                    return reject(err1);
                }
    
                super.db.query(query2, (err2, accounts) => {
                    if (err2) {
                        console.error("Error fetching accounts:", err2);
                        return reject(err2);
                    }
    
                    super.db.query(query3, (err3, settings) => {
                        if (err3) {
                            console.error("Error fetching settings:", err3);
                            return reject(err3);
                        }
    
                        const emailIds = [
                            settings[0].welcome_email_template,
                            settings[0].active_user_email_template,
                            settings[0].deactive_user_email_template,
                            settings[0].ancle_member_email_template,
                            settings[0].prospect_email_template,
                            settings[0].custom_email_template,
                        ].filter(Boolean) 
                         .join(",");

    
                        const Email = `SELECT id, subject AS email_subject FROM email WHERE id IN (${emailIds})`;
    
                        super.db.query(Email, (err4, Emails) => {
                            if (err4) {
                                console.error("Error fetching filtered emails:", err4);
                                return reject(err4);
                            }
    
                            const templateMap = {};
                            Emails.forEach(template => {
                                templateMap[template.id] = template.email_subject;
                            });
    
                            settings[0].welcome_email_template = templateMap[settings[0].welcome_email_template] || settings[0].welcome_email_template;
                            settings[0].active_user_email_template = templateMap[settings[0].active_user_email_template] || settings[0].active_user_email_template;
                            settings[0].deactive_user_email_template = templateMap[settings[0].deactive_user_email_template] || settings[0].deactive_user_email_template;
                            settings[0].cancle_member_email_template = templateMap[settings[0].cancle_member_email_template] || settings[0].cancle_member_email_template;
                            settings[0].prospect_email_template = templateMap[settings[0].prospect_email_template] || settings[0].prospect_email_template;
                            settings[0].custom_email_template = templateMap[settings[0].custom_email_template] || settings[0].custom_email_template;
    
                            resolve({ emails, accounts, settings: settings[0] });
                        });
                    });
                });
            });
        });
    }
    

    static async SettingUpdate(accountId, data, profile) {
        const timestamp = Math.floor(Date.now() / 1000);
        return new Promise((resolve, reject) => {
            let query;
            let values;
    
            if (profile) {
                query = `
                    UPDATE account_setting 
                    SET 
                        admin_name = ?, 
                        company_address = ?, 
                        company_contact = ?, 
                        admin_email = ?, 
                        profile = ?, 
                        company_name = ?, 
                        company_short_name = ?, 
                        title = ?, 
                        company_logo = ?,
                        footer_content = ?, 
                        footer_title = ?, 
                        updated_at = ?
                    WHERE id = ?`;
    
                values = [data.admin_name, data.company_address, data.company_contact, data.admin_email, profile, data.company_name, data.company_short_name, data.title, profile, data.footer_content, data.footer_title, timestamp, accountId];
    
            } else {
                query = `
                    UPDATE account_setting 
                    SET 
                        admin_name = ?, 
                        company_address = ?, 
                        company_contact = ?, 
                        admin_email = ?, 
                        company_name = ?, 
                        company_short_name = ?, 
                        title = ?, 
                        footer_content = ?, 
                        footer_title = ?, 
                        updated_at = ?
                    WHERE id = ?`;
    
                values = [data.admin_name, data.company_address, data.company_contact, data.admin_email, data.company_name, data.company_short_name, data.title, data.footer_content, data.footer_title, timestamp, accountId];
            }
    
            super.db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error executing update query:', err);
                    return reject({ error: 'Error updating settings', details: err });
                }
                resolve(results);
            });
        });
    }

    static async EmailUpdate(data, id) {
        const timestamp = Math.floor(Date.now() / 1000);
        
        return new Promise((resolve, reject) => {
            let query = `
            UPDATE alc_setting 
            SET 
                auto_expire = ?, 
                welcome_email_template = ?, 
                active_user_email_template = ?, 
                cancle_member_email_template = ?, 
                deactive_user_email_template = ?, 
                auto_email_expiring_members = ?,
                prospect_email_template = ?, 
                custom_email_template = ?,
                updated_at = ?
            WHERE id = ?`;

    
            let values = [
                data.auto_expire,
                data.welcome_email_template,
                data.active_user_email_template,
                data.cancle_member_email_template,
                data.deactive_user_email_template,
                data.auto_email_expiring_members,
                data.prospect_email_template,
                data.custom_email_template,
                timestamp,
                id
                
            ];
    
            super.db.query(query, values, (err, result) => {
                if (err) {
                    console.error("Error executing update query:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    

}

module.exports = SettingModel;