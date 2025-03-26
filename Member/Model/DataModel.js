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
    
    
    

}
module.exports=dataModel;