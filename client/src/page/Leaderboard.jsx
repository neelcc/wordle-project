import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { IoIosStar } from "react-icons/io"; 
import { FiLoader } from 'react-icons/fi'
import { ImTrophy } from "react-icons/im";
import axios from 'axios'

const Leaderboard = () => {
    const { leaderboard, lbLoader, handleLeaderboard } = useContext(AppContext)

    


  return (
    <div className='h-screen relative px-2 flex flex-col items-center py-20 sm:py-24  bg-[#D8B0E2] ' >
      <div className='px-4 text-2xl sm:text-4xl shadow-md text-white py-2 font-medium border-2 border-white  bg-red-400 rounded-md ' >
        { lbLoader ? <FiLoader className='transition-all duration-300 animate-spin mx-12 my-1 ' />  : "Leaderboard"}
      </div>

      { leaderboard && ( <div className=' mt-4 flex flex-col py-2 px-2 gap-3 w-full sm:w-lg ' >
        
       { Object.keys(leaderboard).map((user,idx)=> {  return ( <div key={idx} className=' flex border-2 shadow-md  bg-emerald-100 rounded-md py-1 px-2 items-center justify-between  ' >
           <div  className='rounded-full px-5 font-extrabold py-3 border-2 bg-cyan-500 text-yellow-100 border-cyan-900 ' >
                {idx+1}
            </div>
            <div className='flex items-center gap-4 px-2 py-1'>
              <ImTrophy />
            <h1 className='font-medium text-lg sm:text-2xl  '>
              Won: {leaderboard[user].games_won} 
            </h1>
            <IoIosStar />
            <h1 className='font-medium text-lg sm:text-2xl '>
              {leaderboard[user].username} 
            </h1>
          </div>
        </div>)
       })}
      </div>) }
    </div>
  )
}

export default Leaderboard
