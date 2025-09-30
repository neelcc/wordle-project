import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Modal = () => {
  const { handlePlayAgain, ans, isWon } = useContext(AppContext);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-xs  "></div>

      {/* Modal content */}
      <div className="relative bg-cyan-200 px-6 py-4 rounded-md flex flex-col items-center justify-center shadow-md">
        <img src={isWon ? "/assets/youWin.jpg" : "/assets/youloss.jpg"} className=" w-40 sm:w-60 rounded-md shadow-md" alt="You Win" />
        <button 
          onClick={handlePlayAgain}  
          className="w-full px-2 bg-yellow-100 rounded-md border-2 font-medium text-md mt-2"
        >
          Play Again
        </button>
        { ans && <p className=' font-bold mt-2 ' >Word : {ans} </p>}
      </div>
    </div>
  );
}


export default Modal
