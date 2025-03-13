const BaseModel=require('./BaseModel');

class MembershipModel extends BaseModel{

   static async MembershipPlan(id){

        return new Promise((resolve,reject)=>{
            const query=`
                        SELECT 
            CONCAT(membership_plans.id, ":", membership_plans.membership_name) AS membership_id,
            membership_plans.*,
            CASE 
                WHEN company.id = ${id} 
                    AND membership_plans.id = SUBSTRING_INDEX(company.member_plan, ':', 1) 
                THEN 1
                ELSE 0
            END AS current_plan,
            CASE 
                WHEN (
                    SELECT CAST(mp.fees AS UNSIGNED) 
                    FROM membership_plans mp
                    INNER JOIN company c ON mp.id = SUBSTRING_INDEX(c.member_plan, ':', 1)
                    WHERE c.id = ${id}
                ) < CAST(membership_plans.fees AS UNSIGNED) 
                THEN 1 
                ELSE 0
            END AS plan_type
        FROM 
            membership_plans
        LEFT JOIN 
            company 
            ON membership_plans.id = SUBSTRING_INDEX(company.member_plan, ':', 1) 
            AND company.id = ${id}
        ORDER BY 
            CAST(membership_plans.fees AS UNSIGNED) ASC;`

                    super.db.query(query, (err, results) => {
                        if (err) {
                            return reject(err);  
                        }
                            resolve(results) ;
                    });     
        })

        
   }

   static async UpgradePlanRequest(id){

    return new Promise((resolve,reject)=>{
        const query=`select membership_upgrade_request.*
        from membership_upgrade_request
        where company_id=${id};`

                super.db.query(query, (err, results) => {
                    if (err) {
                        return reject(err);  
                    }
                        resolve(results) ;
                });     
    })

    
}

   
   static async UpgradePlan(company_id,membership_id ,member_id){
        return new Promise((resolve,reject)=>{
            const timestrap = Math.floor(Date.now() / 1000);
        
            let query = `
                INSERT INTO membership_upgrade_request
                (company_id, membership_id, member_id, created_at) 
                VALUES (?, ?, ?, ?)`;
            
            super.db.query(query, [company_id,membership_id,member_id,timestrap], (err, result) => {
                if (err) {
                    console.error("Database query error:", err); 
                    return reject(err);
                } else {
                    resolve(result) ;
                }
            });
        });
        
    }

   

}
module.exports=MembershipModel;