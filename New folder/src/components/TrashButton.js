import trash from "./frog.gif";
import trashStill from "./frogStill.gif";
import React, {useState} from "react";
const TrashButton = ({onClick}) => {
    const [image, setImage] = useState(trashStill);
    const buttonStyle = {
       backgroundColor: "chocolate",
       border: "none",
       cursor: "pointer",
       marginTop: "5px",
       marginBottom: "5px"
    };
    
    
    const onMouseOver = () => {
       setImage(trash);
    };
 
    const onMouseOut = (e) => {
       setImage(trashStill);
    };
 
    return (
      <img alt="trashCan" src={image} width="20px" height="20px"
         onMouseEnter={onMouseOver}
         onMouseLeave={onMouseOut}
         onClick={onClick}
         style={buttonStyle}
      />
    );
 };
 export default TrashButton;