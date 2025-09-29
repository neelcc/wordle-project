import React from 'react'
import GameInput from '../components/GameInput'
import Keyboard from '../components/Keyboard'
import Profile from '../components/Profile'

const Playground = () => {
  return (
    <div className='relative py-20 flex flex-col items-center gap-2 h-screen px-2  bg-[#D8B0E2] ' >
      <Profile/>
      <GameInput/>
      <Keyboard/>
    </div>
  )
}

export default Playground
