const BaseController = require("./BaseController");
const CountryModel=require('../Model/CountryModel');
class CountryController extends BaseController{

static async countryList(req,res){

const result = await CountryModel.countryList();


if(result ){
    return res.status(200).json({
        status:'success',
        message:'countryList fetched succesfully',
        data:result,
    }); 
}
else{
    return res.status(200).json({
        status:'error',
        message:'error while fetching countrylist',
        data:result,
    }); 
}

}

static async cityList(req,res){

    const result = await CountryModel.cityList();
    
    
    if(result ){
        return res.status(200).json({
            status:'success',
            message:'cityList fetched succesfully',
            data:result,
        }); 
    }
    else{
        return res.status(200).json({
            status:'error',
            message:'error while fetching cityList',
            data:result,
        }); 
    }
    
    }

    static async CountryCode(req,res){

        const result = await CountryModel.CountryCode();
        
        
        if(result ){
            return res.status(200).json({
                status:'success',
                message:'CountryCode fetched succesfully',
                data:result,
            }); 
        }
        else{
            return res.status(200).json({
                status:'error',
                message:'error while fetching CountryCode',
                data:result,
            }); 
        }
        
        }

}
module.exports= CountryController;