const BaseController = require("./BaseController");
const TimelineModel=require("../Model/TimelineModel")

class TimelineController extends BaseController{

   static async TimelineGet(req,res,next){
    const data= req.body;

    try{
      const result= await TimelineModel.TimelineGet(data);
      if(result.length>0){
        var lastCompanyPostId;

        // if(data.page==0){

        //    lastCompanyPostId = result.length > 0 ? result[0].company_post_id : null;

        // }else{

        //    lastCompanyPostId = result.length > 0 ? result[result.length-1].company_post_id : null;

        // }
        lastCompanyPostId = result.length > 0 ? result[result.length-1].company_post_id : null;

        result.forEach(data => {
          data.file_url=data.file_url.replace("/thumb/", "/"); 
        });

        const sortedPosts = result.sort((a, b) => b.created_at - a.created_at);

        const updatedPosts = sortedPosts.map(post => {
          const companyLikesString = post.company_like || '';
          const companyLikes = companyLikesString.split(',').filter(Boolean).map(Number);
          const userId = Number(data.userId);
        
          return {
              ...post,
              liked: companyLikes.includes(userId) ? 1 : 0
          };
        });

        res.status(200).json({status:'success',data:updatedPosts ,lastCompanyPostId});
      }else{
        res.status(200).json({status:'error',data:result });
      }

    }catch(err){
       next(err);
    }
    
   }

   static async MemberTimeline(req,res,next){
    const data= req.body;
    const id = data.id;

    // return res.status(200).json(id)
    try{
      const result= await TimelineModel.getPostsByCompanyId(id);
      if(result.length>0){
        result.forEach(data => {
          data.file_url=data.file_url.replace("/thumb/", "/"); 
        });
        const sortedPosts = result.sort((a, b) => b.created_at - a.created_at);
        const updatedPosts = sortedPosts.map(post => {
          const companyLikesString = post.company_like || '';
          const companyLikes = companyLikesString.split(',').filter(Boolean).map(Number);
          const userId = Number(data.userId);
          return {
              ...post,
              liked: companyLikes.includes(userId) ? 1 : 0
          };
        });

        res.status(200).json({status:'success',data:updatedPosts ,lastCompanyPostId});
      }else{
        res.status(200).json({status:'error',data:result });
      }

    }catch(err){
       next(err);
    }
    
   }

   static async TimelineLike(req,res,next){
    const data= req.body;

    try{
      const result= await TimelineModel.TimelineLike(data);
      if(result.affectedRows>0){
        res.status(200).json({status:'success',data:result });
      }else{
        res.status(200).json({status:'error',data:result });
      }

    }catch(err){
       next(err);
    }
    
   }


   static async FeedsInsert (req, res,next){
    const data  = req.body;
  
    const files = req.files;
    
    
    const now = new Date();

     // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
     const dayOfWeek = now.getDay(data);

     const startOfWeek = new Date(now);
     startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); 

     startOfWeek.setHours(0, 0, 0, 0);
     
     
     const endOfWeek = new Date(now);
     endOfWeek.setDate(now.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek));
     endOfWeek.setHours(23, 59, 59, 999);
     
     const count_post = await TimelineModel.count_weak(startOfWeek,endOfWeek,data);
  
     if (data.post_unlimited_access==1){
          
         try {
               let postresults;
                 if(files.length>0){
                     
                  postresults = await super.uploadFiles(files,'demo');
                 
                  const result =  await TimelineModel.FeedsInsert(postresults,data);
                     if(result){
                       if (!typeof data.tags === 'undefined' || data.tags) {
                            const mail_tag = await super.EmailSetup.tagMail(data,31);
                       }
                            res.status(200).json({ status: 'success', data: result }); 
                       
                     }
                 
                 }else{
                     const result =  await TimelineModel.FeedsInsert(postresults,data);
                     if(result){
                         if (!typeof data.tags === 'undefined' || data.tags) {
                            const mail_tag = await super.EmailSetup.tagMail(data,31);
                         }
                       res.status(200).json({ status: 'success', data: result }); 
                       
                     }
                 }
             
         } catch (err) {
             
                 next(err);
         } 
          
          
      } else if(data.post_per_weak!=0 && data.post_total_limit!=0){
          
         if((data.post_per_weak>count_post.count_perweak[0].count_perweak_post) && (data.post_total_limit>count_post.total_count[0].total_count_post)) {
             
             try {
               let postresults;
                 if(files.length>0){
                     
                  postresults = await super.uploadFiles(files,'Feeds');
                 
                  const result =  await TimelineModel.FeedsInsert(postresults,data);
                     if(result){
                       if (!typeof data.tags === 'undefined' || data.tags) {
                            const mail_tag = await super.EmailSetup.tagMail(data,31);
                       }

                       res.status(200).json({ status: 'success', data: result }); 
                       
                     }
                 
                 }else{
                     const result =  await TimelineModel.FeedsInsert(postresults,data);
                     if(result){
                         if (!typeof data.tags === 'undefined' || data.tags) {
                            const mail_tag = await super.EmailSetup.tagMail(data,31);
                       }
                      
                       res.status(200).json({ status: 'success', data: result }); 
                       
                     }
                 }
             
             } catch (err) {
                 
                     next(err);
             } 
             
             
         }else{
             
             if(data.perweak_post<= count_post.count_perweak[0].count_perweak_post){
                 
                 res.status(200).json({ status: 'error', msz: 'Your Perweak Limit is exceed, please try again. ' }); 
            
             }else{
                 
                 res.status(200).json({ status: 'error', msz: 'Your Limit is exceed. ' }); 
                
             }
         }
          
          
      }else{
          res.status(200).json({ status: 'error', msz: 'Please try again..' }); 
          
      }

    
     
 }

  

 

}
module.exports= TimelineController;