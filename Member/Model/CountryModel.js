const BaseModel=require('./BaseModel');

class CountryModel extends BaseModel{

    static async countryList() {
        return new Promise((resolve, reject) => {
           super.db.query("SELECT name FROM country ", 
            (err, results) => {
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
           super.db.query("SELECT name FROM country ", 
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
module.exports=CountryModel;