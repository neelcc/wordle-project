import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Modal = () => {
  const { goToHome, handlePlayAgain, ans, isWon, startGameLoader } = useContext(AppContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-xs  "></div>

      {/* Modal content */}
      <div className="relative bg-cyan-200 px-10 py-6 rounded-md flex flex-col items-center justify-center shadow-md">
        <img src={isWon ? "/assets/youWin.jpg" : "/assets/youloss.jpg"} className=" border-2 border-white w-40 sm:w-60 rounded-md shadow-md" alt="You Win" />
        <button 
          onClick={handlePlayAgain}  
          className="  w-full px-2 py-2 bg-yellow-100 rounded-md border-2 font-medium text-md cursor-pointer mt-2"
        >{ startGameLoader ? <FiLoader className='transition-all duration-300 animate-spin mx-8 py-1  ' /> : 
          "Play Again"}
        </button>
        { ans && <p className=' font-bold mt-2 border-2 w-full text-center py-1 rounded-md ' >Word : {ans} </p>}
        <p onClick={goToHome} className=' cursor-pointer font-bold mt-2 border-2 w-full text-center py-1 rounded-md '>Playground</p>
      </div>
    </div>
  );
}


export default Modal
