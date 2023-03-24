import React, {useEffect} from "react";

const StatusMessage = ({message,setMessage,isError=false}) => {
   const messageStyle = {
      color: "white",
      backgroundColor: "red",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "5px",
      paddingBottom: "5px",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      fontFamily: "Arial, Helvetica, sans-serif",
      borderRadius: "10px",
      zIndex: "10000",
   };

   useEffect(() => {
      setTimeout(() => {
         setMessage("");
      }, 2500);
   }, [message, setMessage]);

   return (
      <div id="message" style={messageStyle}>
         {message}
      </div>
   );
};

export default StatusMessage;
