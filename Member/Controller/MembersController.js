const BaseController = require('./BaseController');
const MembersModel = require('../Model/MembersModel');
// const MembersController = require('./MembersController');

class MembersController extends BaseController{

    static async MembersList(req,res){
        try{
            const result = await MembersModel.MembersList();
            if(result.length>0){
                res.status(200).json({status:'success',data:result})

            }
        }catch(err){
            next(err);

        }

    }

}
module.exports = MembersController;