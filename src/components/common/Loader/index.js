import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = () => {
  let [color, setColor] = useState("#ffffff");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const loading=true
  return (
    <div className="wrapper">
       <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader