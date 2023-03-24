const Button = ({onClick, label}) => {
   const buttonStyle = {
      backgroundColor: "chocolate",
      border: "none",
      borderRadius: "5px",
      color: "white",
      fontFamily: "cursive",
      cursor: "pointer",
      transition: "0.5s",
      marginTop: "5px",
      marginBottom: "5px",
   };

   const onMouseOver = (e) => {
      e.target.style.backgroundColor = "brown";
   };

   const onMouseOut = (e) => {
      e.target.style.background = buttonStyle.backgroundColor;
   };

   return (
      <button
         onMouseEnter={onMouseOver}
         onMouseLeave={onMouseOut}
         onClick={onClick}
         style={buttonStyle}>
         {label}
      </button>
   );
};
export default Button;
