import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loader = () => {
  let [color, setColor] = useState("#ffffff");
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <div className="wrapper">
      {/* <div className="loadingio-spinner-ripple-a3wzgttb9p9">
        <div className="ldio-zo3yelr07za">
          <div></div>
          <div></div>
        </div>
      </div> */}
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