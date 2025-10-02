import React, { useContext } from 'react'
import GameInput from '../components/GameInput'
import Keyboard from '../components/Keyboard'
import Profile from '../components/Profile'
import { AppContext } from '../context/AppContext'
import { FiLoader } from 'react-icons/fi'

const Playground = () => {
  const { gameId , handleStartGame, startGameLoader } = useContext(AppContext)
  return (
    <div className='relative py-20 flex flex-col items-center gap-2 h-screen px-4 sm:px-14  bg-[#D8B0E2] ' >
      <Profile/>
      { gameId!==null ?
       <>
       <GameInput/>
       <Keyboard/>
       </>
       :
      <button onClick={handleStartGame} className=' shadow-md bg-yellow-200 px-4 py-1 mt-24 text-2xl font-medium rounded-lg' >{ startGameLoader ? <FiLoader className='transition-all duration-300 animate-spin mx-12 my-1 ' /> : "Start Game!"}</button>
      }
    

    </div>
  )
}

export default Playground
  