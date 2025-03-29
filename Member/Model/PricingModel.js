const BaseModel=require('./BaseModel');

class PricingModel extends BaseModel{

    static async insertPricing(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO pricing_request (
                cus_id, from_and_to_location, shipping_term, ex_works_address, 
                commodity, imo_classification, imo_class, un_numbers, effective_date, expiry_date, 
                shipping_form, fcl_container_type, fcl_container_weight, fcl_container_count, 
                lcl_volume, lcl_weight, lcl_dimensions, lcl_freight_rate, lcl_inland_charges, 
                air_freight_pcs, air_freight_kgs, air_freight_cbm, air_freight_freight_rate, 
                air_freight_inland_charges, comment, invoice, accept, entry_date, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
          
            const values = [
                data.userId, data.LocationCountry, data.shippingTerm, data.ex_works_address,
                data.Commodity, data.IMO_classification, data.imo_class, data.UN_number, 
                data.issueDate, data.expiry_date, data.transportation, data.fcl_container_type, 
                data.fcl_container_weight, data.fcl_container_count, data.lcl_volume, 
                data.lcl_weight, data.lcl_dimensions, data.lcl_freight_rate, data.lcl_inland_charges, 
                data.air_freight_pcs, data.air_freight_kgs, data.air_freight_cbm, 
                data.air_freight_freight_rate, data.air_freight_inland_charges, data.comment, 
                data.invoice, data.accept, data.entry_date, data.created_at
            ]; 
    
      
            super.db.query(query, values, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
    
    
    static async Requestget(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    pr.*, 
                    m.company_name AS company_name
                FROM pricing_request pr
                JOIN member m ON pr.cus_id = m.id
                WHERE pr.cus_id = ?;
            `;
    
          
            super.db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
    
    

   

    
    

}
module.exports=PricingModel;