const BaseController= require("./BaseController")
const BusinessModel= require("../Model/BuisnessModel")

class BusinessController extends BaseController{


static async insertTransaction(req, res) {
  const data = req.body;
      
        const receiver_id = Number(data.From_Company_Name.split(":")[0])
        const sender_id = Number(data.To_Company_Name.split(":")[0])
      
        // return res.status(200).json({receiver_id,sender_id}) 
    try {
        
        const result = await BusinessModel.insertTransaction(data, receiver_id, sender_id);

      
    if (result) {
      return res.status(200).json({status:'success',message:"Transaction saved successfully!", result});
      } else {
       
        return res.status(200).json({status:'error',message:"Failed to save Transaction. No rows were affected", result});
      }
    } catch (error) {
      console.error("Transaction Save Error", error);
      return res.status(200).json({status:'error',message:"Failed to save Transaction. No rows were affected", result});
      
    }
}

static async getTransaction(req,res){
  const data = req.body;
  const id= data.id;
  try{
    const result = await BusinessModel.getTransaction(id);

  if(result){
    return res.status(200).json({status:"success",result})
  }else{
    return res.status(200).json({status:"error",result})
  }
  }
  catch(error){
    return res.status(200).json({status:"error in try catch",data})
  }


}

}
module.exports = BusinessController;