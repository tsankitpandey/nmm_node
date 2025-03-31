const BaseModel=require('./BaseModel');

class MembersModel extends BaseModel{

    static async MembersList(){

        return new Promise((resolve, rejects) => { 
         const query = `SELECT member.* FROM member
            INNER JOIN  company  ON member.company_id  = company.id`;
            super.db.query(query, (err, result) =>{
            if (err) {
                console.error('error fetching members list :', err);
                return rejects(err);
            }
            resolve(result);
        });
    });
    }
}
module.exports = MembersModel;