const BaseModel=require('./BaseModel');

class TimelineModel extends BaseModel{

    static async count_weak(startOfWeek,endOfWeek ,data) {
        return new Promise((resolve, reject) => {

            const query = `
                SELECT
                    count(*) AS count_perweak_post
                FROM company_post
                WHERE company_post.company_id = ? AND company_post.created_at >= ${Math.floor(startOfWeek / 1000)} AND company_post.created_at <=${Math.floor(endOfWeek / 1000)} `;
                
            const query1 = `
                SELECT
                    count(*) AS total_count_post
                FROM company_post
                WHERE company_post.company_id = ? `;    
     
            super.db.query(query, [data.company_id], (err, result) => {
                if (err) {
                    console.error("Database query error:", err); 
                    return reject(err);
                }
                
                super.db.query(query1, [data.company_id], (err, results) => {
                    if (err) {
                        console.error("Database query error:", err); 
                        return reject(err);
                    }
                    resolve({count_perweak:result,total_count:results});
                });
            
               
            });
        });
} 

   
static async FeedsInsert(image, data) {
    return new Promise((resolve, reject) => {
        let tag;
        if (typeof data.tags === 'undefined' || !data.tags) {
            
              tag=null;    
              
            }else{
                tag = JSON.parse(data.tags); 
                tag = tag.join(','); 
            }
               
               
               
        if (image && image.length > 0) {
            const query = `
                INSERT INTO company_post (company_id, member_id, file_url, file_extension,tags,text, \`like\`, created_at) 
                VALUES ?`;
                
         
            
             
            const values = image.map(file => [data.company_id,data.userId,file.thumbUrl,file.extension,tag,data.text,'0',Math.floor(Date.now() / 1000)]);

            super.db.query(query, [values], (err, results) => {
                if (err) {
                    console.error("Database query error:", err); 
                    return reject(err);
                }
                resolve(results);
            });
        } else {
            const query = `
                INSERT INTO company_post (company_id, member_id, tags,text, \`like\`, created_at) 
                VALUES ?`;

            const values = [[data.company_id,data.userId,tag,data.text,'0',Math.floor(Date.now() / 1000)]];

            super.db.query(query, [values], (err, results) => {
                if (err) {
                    console.error("Database query error:", err); 
                    return reject(err);
                }
                resolve(results);
            });
        }
    });
}

static async TimelineGet(data){
    return new Promise((resolve,reject)=>{

     let  last_Id;
     var query;
      if(data.page==0){

         query=`SELECT 
            company_post.text AS text,
            company_post.file_url AS file_url,
            company_post.file_extension AS file_extension,
            company_post.like AS post_like,
            company_post.id AS company_post_id,
            company_post.company_like As company_like,
            company_post.company_id AS company_id,
            company_post.member_id AS member_id,
            company_post.created_at As created_at,
            company.company_name AS company_name,
            CONCAT(member.first_name, ' ', member.middle_name, ' ', member.last_name) AS member_name,
            member.member_logo AS member_logo
            
        FROM company_post 
        INNER JOIN company ON company_post.company_id = company.id 
        INNER JOIN member ON company_post.member_id = member.id 
        Order By company_post.id  Desc
        LIMIT 5;`

      }else{

        last_Id = data.last_Id;
         query=`SELECT 
        company_post.text AS text,
        company_post.file_url AS file_url,
        company_post.file_extension AS file_extension,
        company_post.like AS post_like,
        company_post.company_like As company_like,
        company_post.id AS company_post_id,
        company_post.company_id AS company_id,
        company_post.member_id AS member_id,
        company_post.created_at As created_at,
        company.company_name AS company_name,
        CONCAT(member.first_name, ' ', member.middle_name, ' ', member.last_name) AS member_name,
        member.member_logo AS member_logo
        
    FROM company_post 
    INNER JOIN company ON company_post.company_id = company.id 
    INNER JOIN member ON company_post.member_id = member.id 
    WHERE company_post.id < ${last_Id}
    Order By company_post.id  Desc
    LIMIT 5;`

      }

     

        super.db.query(query,  (err, results) => {
            if (err) {
                console.error("Database query error:", err); 
                return reject(err);
            }
            resolve(results);
        });

    })
}
   

static async TimelineLike(data){

    
    return new Promise((resolve,reject)=>{
        const query = `UPDATE company_post 
               SET company_post.like=${data.new_like_count}, company_post.company_like='${data.new_company_like}'
               WHERE company_post.id=${data.company_post_id}`;

        super.db.query(query,(err,result)=>{
            if (err) {
                console.error("Database query error:", err); 
                return reject(err);
            }
            resolve(result);
        });

    })
}

}
module.exports=TimelineModel;