import React, { useEffect } from "react";
import "./styles.css";
const InputComponent = ({ type, state, setState, placeholder,style, required}) => {
  useEffect(()=>{
   },[state])
   
  
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
      placeholder={placeholder}
      required={required}
       
      style={{ outline: "none", ...style }}
      className="custom-input"
    />
  );
};

export default InputComponent;
