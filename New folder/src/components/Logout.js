import React from "react";
import Button from "./Button";

const Logout = ({setMessage}) => {
   const logOut = () => {
      localStorage.clear();
      setMessage("You are logged out");
   };

   return (
      <>
      <Button onClick={logOut} label="Logout"></Button>
      <br />
      </>
   )
};

export default Logout;
