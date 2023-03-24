require('dotenv').config();
const express = require("express");
const server = express();
server.use(express.json()); 

const placesRouter=require("./routers/places");
server.use("/api/places",placesRouter);

const usersRouter=require("./routers/users");
server.use("/api/users",usersRouter);

const loginRouter=require("./routers/login");
server.use("/api/login",loginRouter);

/*
//example reading documentation as JSON
const fs=require('fs');
const string=fs.readFileSync('doc.json');
const doc=JSON.parse(string);
*/

const yaml=require("yamljs"); 
const doc=yaml.load("./doc.yml");
const swaggerUi=require("swagger-ui-express");
server.use("/api/doc",swaggerUi.serve,swaggerUi.setup(doc));

const port=process.env.PORT;

server.listen(port,(err)=>{
   if(err){
      console.log("Server failed to start: "+err);
   }else{
      console.log("Server is running on port "+port);
   }
});
