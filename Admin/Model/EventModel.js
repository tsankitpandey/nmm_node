const BaseModel = require('./BaseModel');

class EventModel extends BaseModel {
  static async EventorgInsert(data) {
    return new Promise((resolve, reject) => {
      try {
        const timestamp = Math.floor(Date.now() / 1000);

        const query = `
                    INSERT INTO EventOrganizer 
                    ( client_name, First_name, Last_name,email,contact_number,country,description, created_at) 
                    VALUES ( ?,?,?,?,?,?,?,?)`;

        const values = [
          data.client_name,
          data.first_name,
          data.last_name,
          data.email,
          data.contact_number,
          data.country,
          data.Description,
          timestamp,
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

  static async EventSave(data, image) {
    const timestamp = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO event (short_name, name, image, description, start_time, end_time, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        data.short_name,
        data.name,
        image[0].thumbUrl,
        data.description,
        data.start_time,
        data.end_time,
        timestamp,
      ];
      super.db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error executing query1:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}
module.exports = EventModel;