const db=require("../db.js");
const utils=require("../utils.js");
const router=require("express").Router();
const jwt=require("jsonwebtoken");
require('dotenv').config();

router.get("/:id",(request,response)=>{
   const id=request.params.id;
   if(!Number.isInteger(Number(id))){
      utils.handleError(response,"Place id "+id+" is invalid",400);
      return;
   }
   db.getPlace(id,
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (places)=>{ 
         if(places.length==0){
            utils.handleError(response,"No place with id "+id);
         }else{
            const place=places[0];
            response.json(place);
         }
      }
   );
});

router.delete("/:id",(request,response)=>{
   const id=request.params.id;
   if(!Number.isInteger(Number(id))){
      utils.handleError(response,"Place id "+id+" is invalid",400);
      return;
   }
   db.getPlace(id,
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (places)=>{ 
         if(places.length==0){
            utils.handleError(response,"No place with id "+id);
         }else{
            const place=places[0];
            const auth=request.get("authorization");
            const userId=place.UserID;
            const res=utils.handleAuthorization(auth,userId);
            if(res.success==false){
               utils.handleError(response,res.message,res.httpCode);
               return;
            }
            db.deletePlace(id,
               (err)=>{
                  utils.handleError(response,"Database Problem");
               },
               (res)=>{
                  response.json(place);
               }
            );
         }
      }
   );
});

router.get("/",(request,response)=>{
   db.getAllPlaces(
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (places)=>{ 
         if(places.length==0){
            utils.handleError(response,"No Places Exist",404);
         }else{
            response.json(places);
         }
      }
   );
});

router.post("/",(request,response)=>{
   const auth=request.get("authorization");
   const userId=request.body.userId;
   const res=utils.handleAuthorization(auth,userId);
   if(res.success==false){
      utils.handleError(response,res.message,res.httpCode);
      return;
   }
   db.addPlace(request.body,
      (err)=>{
         utils.handleError(response,"Database Problem");
      },
      (res)=>{ 
         db.getPlace(res.insertId,
            (err)=>{
               utils.handleError(response,"Database Problem");
            },
            (places)=>{ 
               if(places.length==0){
                  utils.handleError(response,"No place with id "+id);
               }else{
                  const place=places[0];
                  response.json(place);
               }
            }
         );
      }
   );
});

module.exports=router;