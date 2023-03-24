const jwt=require("jsonwebtoken");
require('dotenv').config();

const handleError=(response,message,code=404)=>{
   response.status(code).json({error:message});
}

const handleAuthorization=(auth,userId)=>{
   let decodedToken=null;
   if(auth && auth.toLowerCase().startsWith("bearer ")){
      const token=auth.substring(7);
      try{
         decodedToken=jwt.verify(token,process.env.SECRET);
      }catch(err){
         return {success:false,message:"Token Error",httpCode:404};
      }
      if(decodedToken.ID != userId){
         return {success:false,message:"Unauthorized",httpCode:401};
      }
   }else{
      return {success:false,message:"Unauthorized",httpCode:401};
   }
   return {success:true};
}

module.exports={
   handleError,
   handleAuthorization
}