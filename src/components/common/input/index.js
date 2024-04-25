import React, { useEffect } from "react";
import "./styles.css";
const InputComponent = ({label,id, type, state, setState, placeholder,style, required}) => {
  useEffect(()=>{
   },[state])
   
  
  return (
   <>
    {/* <label htmlFor={label} className="label-input">{label}</label> */}
    <input
      type={type}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
      placeholder={placeholder}
      required={required}
       id={id}
       className="custom-input"
    />
    </>
  );
};

export default InputComponent;
