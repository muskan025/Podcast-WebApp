import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = () => {
  let [color, setColor] = useState("#18b2de");
  const override = {
    display: "block",
    position:'absolute',
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    borderColor: "#337c79",
  };
  const loading=true
  return (
    <div className="wrapper">
       <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader