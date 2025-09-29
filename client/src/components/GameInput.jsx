import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const GameInput = () => {
  const { board } = useContext(AppContext);

return (
  <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-2 px-2 mb-8">
    {board && board.map((row, i) =>
      row.map((letter, j) => (
        <div
          key={`${i}-${j}`}
          className="min-h-15 min-w-15 bg-red-300 shadow-md border-2 border-white flex items-center justify-center font-bold text-4xl rounded-md text-gray-100"
        >
          {letter}
        </div>
      ))
    )}
  </div>
);
}

export default GameInput
