import React, { useState } from "react";
import "./styles.css";
import { BsCardImage } from "react-icons/bs";

const FileInput = ({ label,accept, id, fileHandleFnc, text, fileStyle, }) => {
  const [fileSelected, setFileSelected] = useState("");
  let setfileStyle = fileStyle ? fileStyle : {};
  const onChange = (e) => {
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);

  };
  return (
    <>
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active"} `}
      >
         
        <BsCardImage className="image-icon" />

        {fileSelected ? `${fileSelected}` : text}
      </label>
      <input
        type="file"
        
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
        className="custom-input"
        
      />
        
    </>
  );
};

export default FileInput;
