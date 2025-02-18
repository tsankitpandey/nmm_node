const BaseController=require('./BaseController');
// const DataModel=require('../Model/DataModel')

class DataController extends BaseController{

static async countrylist(req,res){
    const query=`SELECT 
    name AS label,
    CONCAT(country.id, ':', country.name) AS value
    FROM country`

    super.db.query(query, (err, results) => {
        if (err) {
            return reject(err);
        }
       res.status(200).json(results)
    });

}

static async citylist(req,res){
    const query=`SELECT 
    name AS label,
    CONCAT(city.state_id, ':', city.name) AS value
    FROM city`

    super.db.query(query, (err, results) => {
        if (err) {
            return reject(err);
        }
       res.status(200).json(results)
    });

}

static async timeZone(req,res){
    const query=`SELECT 
    name AS label,
    CONCAT(city.state_id, ':', city.name) AS value
    FROM city`

    super.db.query(query, (err, results) => {
        if (err) {
            return reject(err);
        }
       res.status(200).json(results)
    });

}

}
module.exports = DataController;
