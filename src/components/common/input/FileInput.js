import React, { useState } from "react";
import './styles.css'
import { BsCardImage } from "react-icons/bs";

const FileInput = ({ accept, id, fileHandleFnc,text }) => {
  const [fileSelected, setFileSelected] = useState("");
  const onChange = (e) => {
    console.log(e.target.files);
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
      />
    </>
  );
};

export default FileInput;
