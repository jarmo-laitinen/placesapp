const db=require("../db.js");
const utils=require("../utils.js");
const router=require("express").Router();
const jwt=require("jsonwebtoken");
require('dotenv').config();
const bcrypt=require("bcrypt");

router.get("/names/:name",(request,response)=>{
   const name=request.params.name;
   db.getUserByName(name,
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (users)=>{ 
         if(users.length==0){
            utils.handleError(response,"No user with name "+name);
         }else{
            const user=users[0];
            response.json(user);
         }
      }
   );
});

router.get("/:id",(request,response)=>{
   const id=request.params.id;
   if(!Number.isInteger(Number(id))){
      utils.handleError(response,"User id "+id+" is invalid",400);
      return;
   }
   db.getUser(id,
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (users)=>{ 
         if(users.length==0){
            utils.handleError(response,"No user with id "+id);
         }else{
            const user=users[0];
            response.json(user);
         }
      }
   );
});

router.get("/",(request,response)=>{
   db.getAllUsers(
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (users)=>{ 
         if(users.length==0){
            utils.handleError(response,"No Users Exist");
         }else{
            response.json(users);
         }
      }
   );
});

router.post("/",async (request,response)=>{
   const encryptedPassword=await bcrypt.hash(request.body.password, 10);
   request.body.password=encryptedPassword;
   db.addUser(request.body,
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (res)=>{ 
         db.getUser(res.insertId,
            (err)=>{
               utils.handleError(response,"Database Problem");
            },
            (users)=>{ 
               if(users.length==0){
                  utils.handleError(response,"No user with id "+id);
               }else{
                  const userInfo=users[0];
                  delete userInfo["Password"];
                  const token=jwt.sign(userInfo,process.env.SECRET);
                  userInfo.token=token;
                  response.json(userInfo);
               }
            }
         );
      }
   );
});

module.exports=router;