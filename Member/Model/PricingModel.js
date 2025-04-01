const { promiseImpl } = require('ejs');
const BaseModel = require('./BaseModel');
const { resolve } = require('path');

class PricingModel extends BaseModel {

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



    static async RequestFillter(id) {
        return new Promise((resolve, reject) => {
            const queryCompanyId = `SELECT company_id FROM member WHERE id = ?`;

            super.db.query(queryCompanyId, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return reject(new Error("No company_id found for this member ID"));
                }

                const companyId = results[0].company_id;

                const queryCompanyDetails = `SELECT country, company_name FROM company WHERE id = ?`;
                const queryPricing = `SELECT * FROM pricing_request WHERE from_and_to_location = ? AND pricing_request.accept=${0} `;


                Promise.all([
                    new Promise((resolve, reject) => {
                        super.db.query(queryCompanyDetails, [companyId], (err, companyResults) => {
                            if (err) return reject(err);
                            if (companyResults.length === 0) return reject(new Error("No company details found for this company ID"));
                            resolve(companyResults[0]);
                        });
                    })
                ])
                    .then(([companyDetails]) => {
                        super.db.query(queryPricing, [companyDetails.country], (err, pricingResults) => {
                            if (err) return reject(err);


                            resolve({
                                company_name: companyDetails.company_name,
                                pricing_requests: pricingResults
                            });
                        });
                    })
                    .catch(reject);
            });
        });
    }

    static async RequestApprove(data, image) {
        return new Promise((resolve, reject) => {
            const timestamp = Date.now(); 
    
            const query1 = new Promise((resolve, reject) => {
                const sql = `UPDATE pricing_request SET accept = 1 WHERE id = ?`;
                super.db.query(sql, [data.reqId], (updateErr, updateResults) => {
                    if (updateErr) {
                        return reject(updateErr);
                    }
                    resolve(updateResults);
                });
            });
    
            const query2 = new Promise((resolve, reject) => {
                const sql = `INSERT INTO pricing_accept (pricing_request_id, receiver_member_id, invoice, created_at) VALUES (?, ?, ?, ?)`;
                const values = [data.reqId, data.userId, image[0].thumbUrl, timestamp];
                super.db.query(sql, values, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
    
            // Ensure Promise.all is used correctly
            Promise.all([query1, query2])
                .then(([updateResults, results]) => {
                    resolve({
                        updateResults,
                        results,
                    });
                })
                .catch(reject); // Handle errors
        });
    }
    
    


    static async ApprovedRequest(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    pa.pricing_request_id, 
                    m.company_name 
                FROM pricing_accept AS pa
                JOIN member AS m ON pa.receiver_member_id = ${id}
                WHERE pa.receiver_member_id = ?`;
    
            super.db.query(query, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(new Error("No pricing request found for the given member ID"));
                }
    
                const pricingRequestIds = results.map(result => result.pricing_request_id); 
    
             
                const query2 = `SELECT * FROM pricing_request WHERE id IN (?) AND accept = ?`;
    
                super.db.query(query2, [pricingRequestIds, 1], (err, updateResults) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({
                        pricingRequests: updateResults,  
                        companyName: results[0].company_name  
                    });
                });
            });
        });
    }
    
    
    




}
module.exports = PricingModel;