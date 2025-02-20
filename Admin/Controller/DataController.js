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
    const id= req.query.country_id;;


    const query=`SELECT 
    name AS label,
    city.name AS value
    FROM city
    where country_id=${id}`

    super.db.query(query, (err, results) => {
        if (err) {
            return reject(err);
        }
       res.status(200).json(results)
    });

}

static async timezonelist(req,res){
    const id= req.query.country_id;;


    const query=`SELECT 
    name AS label,
    timezone.name AS value
    FROM timezone
    where country_id=${id}`

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
