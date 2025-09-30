import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const GameInput = () => {
  const { board, selectedRow, resultBoard } = useContext(AppContext);
  

return (
  <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-2 px-2 mb-8  ">
    {board && board.map((row, i) =>
      row.map((letter, j) => (
        <div
          key={`${i}-${j}`}
          className={`min-h-10 min-w-10  shadow-md border-2 transition-colors duration-300 ease-in-out border-white flex items-center justify-center font-bold text-3xl xl:text-4xl xl:h-15 xl:w-15 rounded-md text-gray-100
          ${ resultBoard[i][j]==="+"  && "bg-green-500" }
          ${ resultBoard[i][j]==="*"  && "bg-yellow-300" }
          ${ resultBoard[i][j]==="-"  &&  "bg-red-300"  }
          
          `}
        >
          {letter}  
        </div>
      ))
    )}
  </div>
);
}

export default GameInput
