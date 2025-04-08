const BaseModel=require('./BaseModel');

class dataModel extends BaseModel{

    static async getContainer() {
        return new Promise((resolve, reject) => {
            const query=`SELECT 
                CONCAT(container_type_master.id, ':', container_type_master.name) AS value,
                container_type_master.name AS label
            FROM container_type_master;`
            super.db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } 
                   
            
                    resolve(results);
                
            });
        });
    }
    
    static async airportMaster() {
        return new Promise((resolve, reject) => {
            const query=`SELECT 
                CONCAT(airportmaster.id, ':', airportmaster.City) AS value,
                airportmaster.City AS label,
                airportmaster.country_id AS CountryId
            FROM airportmaster;`
            super.db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } 
                    resolve(results);
                
            });
        });
    }

    static async commodityMaster() {
        return new Promise((resolve, reject) => {
            const query = `SELECT 
                CONCAT(commodity_master.id, ':', commodity_master.commodity_name) AS value,
                commodity_master.commodity_name AS label
            FROM commodity_master;`; 
    
            super.db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    static async imoMaster() {
        return new Promise((resolve, reject) => {
            const query=`SELECT 
                CONCAT(imomaster.id, ':', imomaster.name) AS value,
                imomaster.name AS label,
                imomaster.imo_value AS imoValue
            FROM imomaster;`
            super.db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } 
                    resolve(results);
                
            });
        });
    }

    static async UnMaster() {
        return new Promise((resolve, reject) => {
            const query=`SELECT 
                CONCAT(unmaster.id, ':', unmaster.name) AS value,
                unmaster.name AS label,
                unmaster.imomaster_id AS unId
            FROM unmaster;`
            super.db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } 
                    resolve(results);
                
            });
        });
    }

    static async Companylist() {
        return new Promise((resolve, reject) => {
            const query = `SELECT 
                CONCAT(company.id, ':', company.company_name) AS value,
                company.company_name AS label
            FROM company;`; 
            
            super.db.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    static async cityList() {
        return new Promise((resolve, reject) => {
           super.db.query("SELECT name FROM city", 
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async CountryCode() {
        return new Promise((resolve, reject) => {
            super.db.query("SELECT phone_code, flag_code FROM country ORDER BY phone_code ASC", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const formattedData = results.map(item => {
                        // Convert "U+1F1E6 U+1F1E9" → "🇦🇫"
                        const flag = item.flag_code
                            .split(" ")
                            .map(code => String.fromCodePoint(parseInt(code.replace("U+", ""), 16)))
                            .join("");
    
                        return {
                            label: `${flag} ${item.phone_code}`, // "🇦🇫 93"
                            value: `${flag} ${item.phone_code}`   // "🇦🇫 93"
                        };
                    });
    
                    resolve({ data: formattedData });
                }
            });
        });
    }
    
    static async Services() {
        return new Promise((resolve, reject) => {
          const query = `
            SELECT service_name AS label, CONCAT(services.id, ':', services.service_name) AS value
            FROM services
          `;
      
          super.db.query(query, (err, results) => {
            if (err) {
              console.error("Error fetching services:", err);
              return reject(err);
            }
            resolve(results);
          });
        });
      }
      
      static async InsertServices(companyId, serviceIds) {
        return new Promise((resolve, reject) => {
          const servicesString = serviceIds.join(",")
      
          const query = `
            UPDATE company
            SET service = ?
            WHERE id = ?
          `;
      
          super.db.query(query, [servicesString, companyId], (err, result) => {
            if (err) {
              console.error("Error updating services column:", err);
              return reject(err);
            }
            resolve(result);
          });
        });
      }
      
      
      
    
    

}
module.exports=dataModel;