import React, {useState} from "react";
import Button from "./Button";
import TextInput from "./TextInput";

const LoginForm = ({setMessage}) => {
   const [userName, setUserName] = useState("");
   const [userPassword, setUserPassword] = useState("");

   const checkFields = () => {
      if (userName === "") {
         setMessage("Please enter your name");
         return false;
      }

      if (userPassword === "") {
         setMessage("Please enter your password");
         return false;
      }
      return true;
   };

   const doLoginRequest = () => {
      if (!checkFields) {
         return;
      }
      fetch("http://localhost:3001/api/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            name: userName,
            password: userPassword,
         }),
      })
         .then((response) => {
            if (!response.ok) {
               throw Error(response.status);
            }
            return response.json();
         })
         .then((data) => {
            localStorage.setItem("userId", data.ID);
            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedName", data.Name);
            setMessage("You are logged in as " + data.Name);
         })
         .catch((err) => {
            console.log(err);
            setMessage("Wrong user or password. Please try again.");
         });
      setUserName("");
      setUserPassword("");
   };

   const doRegisterRequest = () => {
      if (!checkFields) {
         return;
      }
      fetch("http://localhost:3001/api/users", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            name: userName,
            password: userPassword,
         }),
      })
         .then((response) => {
            if (!response.ok) {
               throw Error(response.status);
            }
            return response.json();
         })
         .then((data) => {
            localStorage.setItem("userId", data.ID);
            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedName", data.Name);
            setMessage("New user was created. You are logged in!");
         })
         .catch((err) => {
            console.log(err);
            setMessage("Something went wrong. Please try again.");
         });

      setUserName("");
      setUserPassword("");
   };

   return (
      <>

         <TextInput
            label="Name"
            value={userName}
            setValue={setUserName}></TextInput>

         <br />

         <TextInput
            label="Password"
            value={userPassword}
            setValue={setUserPassword}
            type="password"></TextInput>

         <br />

         <Button onClick={doLoginRequest} label="Login"></Button>
         <Button onClick={doRegisterRequest} label="Register"></Button>

         <br />
         <br />
         <br />
      </>
   );
};

export default LoginForm;
