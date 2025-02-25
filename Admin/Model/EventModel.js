const BaseModel = require('./BaseModel');

class EventModel extends BaseModel {
  static async EventorgUpdate(data, id) {
    return new Promise((resolve, reject) => {
        try {
            const timestamp = Math.floor(Date.now() / 1000);

            const query = `
                UPDATE EventOrganizer 
                SET client_name = ?, 
                    First_name = ?, 
                    Last_name = ?, 
                    email = ?, 
                    contact_number = ?, 
                    country = ?, 
                    description = ?, 
                    updated_at = ?
                WHERE id = ?`;

            const values = [
                data.client_name,
                data.first_name,
                data.last_name,
                data.email,
                data.contact_number,
                data.country,
                data.Description,
                timestamp, // updated_at timestamp
                id // where id = ?
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

  static async FetchEventOrganizers() {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM EventOrganizer ORDER BY updated_at DESC`;

            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return reject({
                        success: false,
                        message: "Database fetch failed",
                        error: err,
                    });
                }

                resolve({
                    success: true,
                    message: "Data fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            reject({ success: false, message: "Unexpected error occurred", error });
        }
    });
}

static async DeleteEvent(id){
    return new Promise((resolve, reject) => {
        try {
       
            const query = 'DELETE FROM nmm_event WHERE id = ?';

          
            super.db.query(query, [id], (error, results) => {
                if (error) {
                    reject({ success: false, message: 'Error deleting feed', error: error });
                } else {
                    if (results.affectedRows > 0) {
                        resolve({ success: true, message: 'event deleted successfully' });
                    } else {
                        reject({ success: false, message: 'event not found or already deleted' });
                    }
                }
            });
        } catch (error) {
            reject({ success: false, message: 'Unexpected error occurred', error: error });
        }
    });
}

static async FetchEvent() {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM nmm_event ORDER BY updated_at DESC`;

            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return reject({
                        success: false,
                        message: "Database fetch failed",
                        error: err,
                    });
                }

                resolve({
                    success: true,
                    message: "Data fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            reject({ success: false, message: "Unexpected error occurred", error });
        }
    });
}

static async AddEvent(data, image) {


    const timestamp = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
       
        const query = `
            INSERT INTO nmm_event 
            (Event_Title, Event_Name, file_url, description, start_date, end_date, Location, timeZone, status, created_at) 
            VALUES (?,?,?,?,?,?,?,?,?,?)
        `;

        // Ensure image exists
        const imageUrl = image.length > 0 ? image[0].thumbUrl : null;

        const values = [
            data.Event_tittle,
            data.Event_Name,
            imageUrl,
            data.Event_Description,
            data.start_date,
            data.end_date,
            data.Location,
            data.timeZone || "UTC", 
            data.eventStatus,
            timestamp  
        ];

        super.db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

static async UpdateEvent(eventId, data, image) {
    const timestamp = Math.floor(Date.now() / 1000);

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE nmm_event 
            SET 
                Event_Title = ?, 
                Event_Name = ?, 
                file_url = ?, 
                description = ?, 
                start_date = ?, 
                end_date = ?, 
                Location = ?, 
                timeZone = ?, 
                status = ?, 
                updated_at = ?
            WHERE event_id = ?
        `;

        const imageUrl = image.length > 0 ? image[0].thumbUrl : data.existingImageUrl; 

        const values = [
            data.Event_tittle,
            data.Event_Name,
            imageUrl,
            data.Event_Description,
            data.start_date,
            data.end_date,
            data.Location,
            data.timezone ,
            data.eventStatus,
            timestamp, 
            eventId 
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


static async EmsInsert(data) {
    // const timestamp = Math.floor(Date.now() / 1000);
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO ems_detail 
            (purpose, message) 
            VALUES (?, ?)
        `;

        const values = [
            data.purpose,  
            data.message_description,  
            // timestamp  
        ];

        super.db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

static async EmsUpdate(data,id) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE ems_detail 
            SET purpose = ?, message = ?
            WHERE id = ?
        `;

        const values = [
            data.purpose,  
            data.message_description,
            id  
        ];

        super.db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

static async EmsDelete(id) {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM ems_detail 
            WHERE id = ?
        `;

        super.db.query(query, [id], (err, result) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}


static async FetchEms() {
    return new Promise((resolve, reject) => {
        try {
            const query = `SELECT * FROM ems_detail ORDER BY created_at DESC`;

            super.db.query(query, (err, results) => {
                if (err) {
                    console.error("Database Error:", err);
                    return reject({
                        success: false,
                        message: "Database fetch failed",
                        error: err,
                    });
                }

                resolve({
                    success: true,
                    message: "Data fetched successfully",
                    data: results,
                });
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            reject({ success: false, message: "Unexpected error occurred", error });
        }
    });
}

}


module.exports = EventModel;