const db=require("../db.js");
const utils=require("../utils.js");
const router=require("express").Router();
const jwt=require("jsonwebtoken");
require('dotenv').config();
const bcrypt=require("bcrypt");

router.post("/",(request,response)=>{
   const {name,password}=request.body;
   db.getUserByName(name,
      (err)=>{
         console.log(err)
      },
      async (res)=>{
         if(res.length==0){
            utils.handleError(response,"No user with name "+name);
         }else{
            const userInfo=res[0];
            if(await bcrypt.compare(password,userInfo.Password)){
               delete userInfo.Password;
               const token=jwt.sign(userInfo,process.env.SECRET);
               userInfo.token=token;
               response.json(userInfo);
            }else{
               utils.handleError(response,"Wrong password",401);
            }
         }
         console.log(res)
      }
   );
});

module.exports=router;