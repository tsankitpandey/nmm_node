const { resolve } = require("path");
const BaseModel = require("./BaseModel");

class MembershipModel extends BaseModel {
  static async PlanInsert(data) {
    return new Promise((resolve, reject) => {
      try {
        const timestamp = Math.floor(Date.now() / 1000);

        const query = `
          INSERT INTO membership_plans 
          (
            membership_name, description, attend_event,comment_feed, direct_chat, duration_in_months, 
            extra_contact, extra_contact_limit, post_total_limit, fees, gallery_access, 
            mobile_access, personal_contact_details, post_access, post_per_weak, 
            status, upload_video, gallary_unlimited_access,post_unlimited_access, uploade_photo, created_at
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
          data.membership_plans.membership_name,  
          data.area,      
          data.membership_plans.attend_event,
          data.membership_plans.comment_feed,
          data.membership_plans.direct_chat,
          data.membership_plans.duration_in_months,
          data.membership_plans.extra_contact,
          data.membership_plans.extra_contact_limit,
          data.membership_plans.feeds_upload,
          data.membership_plans.fees,
          data.gallery_access,
          data.membership_plans.mobile_access,
          data.membership_plans.personal_contact_details,
          data.membership_plans.post_access,
          data.membership_plans.post_per_weak,
          data.membership_plans.status,
          data.upload_video,
          data.Gallery_unlimited_access,
          data.membership_plans.unlimited_access,
          data.upload_photo,
          timestamp ,
        
        ];

        super.db.query(query, values, (err, result) => {
          if (err) {
            console.error("Database Error:", err);
            return reject({
              success: false,
              message: "Database insertion failed",
              error: err,
            });
          }

          resolve({
            success: true,
            message: "Data inserted successfully",
            result,
          });
        });
      } catch (error) {
        console.error("Insert Error:", error);
        reject({ success: false, message: "Unexpected error occurred", error });
      }
    });
  }

  static async MembershipGet() {
    return new Promise((resolve, reject) => {
      try {
        const query = "SELECT * FROM membership_plans"; 
  
        super.db.query(query, (err, results) => {
          if (err) {
            console.error("Database Error:", err);
            return reject({
              success: false,
              message: "Database retrieval failed",
              error: err,
            });
          }
  
          resolve({
            success: true,
            message: "Data retrieved successfully",
            data: results,
          });
        });
      } catch (error) {
        console.error("Fetch Error:", error);
        reject({ success: false, message: "Unexpected error occurred", error });
      }
    });
  }

  static async MembershipUpdate(data, membershipId) {
    return new Promise((resolve, reject) => {
      try {
        const timestamp = Math.floor(Date.now() / 1000);
  
        const query = `
          UPDATE membership_plans SET 
            membership_name = ?, 
            description = ?, 
            attend_event = ?, 
            comment_feed = ?, 
            direct_chat = ?, 
            duration_in_months = ?, 
            extra_contact = ?, 
            extra_contact_limit = ?, 
            post_total_limit = ?, 
            fees = ?, 
            gallery_access = ?, 
            mobile_access = ?, 
            personal_contact_details = ?, 
            post_access = ?, 
            post_per_weak = ?, 
            status = ?, 
            upload_video = ?, 
            uploade_photo = ?,
            gallary_unlimited_access = ?,
            post_unlimited_access= ?
          WHERE id = ?`; 
  
        const values = [
          data.membership_plans.membership_name,
          data.area,  
          data.membership_plans.attend_event,
          
          data.membership_plans.comment_feed,
          data.membership_plans.direct_chat,
          data.membership_plans.duration_in_months,
          data.membership_plans.extra_contact,
          data.membership_plans.extra_contact_limit,
          data.membership_plans.feeds_upload,
          data.membership_plans.fees,
          data.gallery_access,
          data.membership_plans.mobile_access,
          data.membership_plans.personal_contact_details,
          data.membership_plans.post_access,
          data.membership_plans.post_per_weak,
          data.membership_plans.status,
          data.membership_plans.upload_video,
          data.membership_plans.uploade_photo,
          data.unlimited_gallery_access,
          data.unlimited_post_access,

        
          membershipId 
        ];
  
        super.db.query(query, values, (err, result) => {
          if (err) {
            console.error("Database Error:", err);
            return reject({
              success: false,
              message: "Database update failed",
              error: err,
            });
          }
  
          resolve({
            success: true,
            message: "Data updated successfully",
            result,
          });
        });
      } catch (error) {
        console.error("Update Error:", error);
        reject({ success: false, message: "Unexpected error occurred", error });
      }
    });
  }
  
  static async MembershipDelete(id) {
    return new Promise((resolve, reject) => {
        try {
            const query = "DELETE FROM membership_plans WHERE id = ?";
            
            super.db.query(query, [id], (err, result) => {
                if (err) {
                    console.error("Database Error:", err);
                    return reject({
                        success: false,
                        message: "Failed to delete membership plan",
                        error: err,
                    });
                }

                if (result.affectedRows === 0) {
                    return resolve({
                        success: false,
                        message: "No membership plan found with the given ID",
                    });
                }

                resolve({
                    success: true,
                    message: "Membership plan deleted successfully",
                });
            });
        } catch (error) {
            console.error("Delete Error:", error);
            reject({ success: false, message: "Unexpected error occurred", error });
        }
    });
}

  
}

module.exports = MembershipModel;
