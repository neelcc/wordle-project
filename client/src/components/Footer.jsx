import { Rabbit } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-violet-200 flex text-center py-2 gap-1 items-center justify-center ' >
      <p className=' text-gray-900 font-mono text-md ' >Made by Neel</p>
      <Rabbit size={15} />
    </div>
  )
}

export default Footer
