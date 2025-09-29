import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className=' bg-violet-200 h-screen px-2 text-center flex flex-col py-20 justify-center items-center ' >
        <p className=' px-6 py-1 bg-gray-50/40 rounded-full font-medium text-sm sm:text-xl  mb-2  ' >For Idiots</p>
      <h1 className='max-sm:w-55  text-2xl sm:text-4xl font-semibold ' >Want to check your speed of thinking?</h1>
      <button onClick={()=>navigate('/auth')} className=' py-1 bg-yellow-200 rounded-md px-4 text-md sm:text-2xl  font-medium mt-4 cursor-pointer ' >Play Now!</button>
    </div>
  )
}

export default Home
