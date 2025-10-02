import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const ErrorPopup = () => {
    const { error, showPopup } = useContext(AppContext)
  return ( <>
   {error && <div
      className={`transition-all duration-300   ${
        showPopup ? "opacity-100 translate-y-30" : "opacity-0 -translate-y-4"
      } absolute top-0 left-1/2 -translate-x-1/2 bg-cyan-300 text-black px-4 py-2 rounded-md shadow-md font-bold z-50`}
    >
      {error}
    </div> }
    </> 
  );
  
};

export default ErrorPopup;
