const TextInput = ({label, value, setValue, type="text"}) => {
   const labelStyle = {
      display: "inline-block",
      width: "150px",
      textAlign: "left",
   };

   const inputStyle = {
      width: "150px",
   };

   return (
      <>
         <label htmlFor={label} style={labelStyle}>
            {label}
         </label>
         <input
            onInput={(evt) => setValue(evt.target.value)}
            style={inputStyle}
            type={type}
            name={label}
            placeholder={label}
            value={value}
         />
      </>
   );
};

export default TextInput;
