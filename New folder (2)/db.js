require('dotenv').config();
const maria=require("mariadb/callback");

let host=process.env.DB_HOSTNAME;
let user=process.env.DB_USERNAME;
let password=process.env.DB_PASSWORD;
let dbName=process.env.DB_NAME;
if(process.env.TESTING=="local"){
   host=process.env.LOCAL_DB_HOSTNAME;
   user=process.env.LOCAL_DB_USERNAME;
   password=process.env.LOCAL_DB_PASSWORD;
   dbName=process.env.LOCAL_DB_NAME;
}

const sendQuery = (sql, onError, onSuccess) => {
   const con=maria.createConnection({
      host:host,
      user:user,
      password:password,
      database:dbName
   });
   con.connect((err) => {
      if(err){
         onError(err);
      }else{
         con.query(sql,(err, res) => {
            if(err){
               onError(err);
            }else{
               onSuccess(res);
            }
            con.commit();
            con.end();
         })
      }
   });
}

const getAllPlaces=(onError, onSuccess)=>{
   sendQuery(`SELECT Places.*, Users.Name AS UserName
      FROM Places JOIN Users
      ON Users.ID = Places.UserID`,onError,onSuccess);
}

const getPlace=(id, onError, onSuccess)=>{
   sendQuery(`SELECT Places.*, Users.Name AS UserName
      FROM Places JOIN Users
      ON Users.ID = Places.UserID 
      WHERE Places.ID = ${id}`,onError,onSuccess);
}

const deletePlace=(id, onError, onSuccess)=>{
   sendQuery(`DELETE FROM Places 
      WHERE ID = ${id}`,onError,onSuccess);
}

const addPlace=(info, onError, onSuccess)=>{
   sendQuery(`INSERT INTO Places 
      (Name, UserID, Latitude, Longitude)
      VALUES
      ("${info.name}",${info.userId},
      ${info.latitude},${info.longitude})`,
      onError,onSuccess);
}

const getAllUsers = (onError, onSuccess)=>{
   sendQuery(`SELECT * FROM Users`, 
      onError, onSuccess);
}

const getUser = (id, onError, onSuccess) => {
   sendQuery(`SELECT * FROM Users 
      WHERE ID='${id}'`, 
      onError, onSuccess);
};

const getUserByName = (name, onError, onSuccess) => {
   sendQuery(`SELECT * FROM Users 
      WHERE Name='${name}'`, 
      onError, onSuccess);
};

const addUser=(info, onError, onSuccess)=>{
   sendQuery(`INSERT INTO Users 
      (Name, Password)
      VALUES
      ("${info.name}","${info.password}")`,
      onError,onSuccess);
}

module.exports={
   getAllPlaces,
   getPlace,
   deletePlace,
   addPlace,
   getAllUsers,
   getUser,
   getUserByName,
   addUser
}