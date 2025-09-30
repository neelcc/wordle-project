import React, { useContext } from 'react'
import { User } from "lucide-react";
import { AppContext } from '../context/AppContext';
import StaggeredDropDown from './DropdownUser';


const Profile = () => {


    const { user, gameId } = useContext(AppContext)

  return (
    <div className=' max-sm:w-full sm:w-120 border-2 border-white bg-cyan-100/70 rounded-md cursor-pointer px-2 py-2 sm:py-1 xl:py-2  ' >
      { user && <div className={` ${gameId===null ? "justify-center" : "justify-around sm:justify-between"  } flex items-center `} >
        <span className=' flex items-center gap-1 ' > <User size={25} />
        <StaggeredDropDown/>
       </span>
       <p className=' font-medium ' >{gameId!==null && `Game Id: ${gameId}` }</p>
       </div> 
        }
    </div>
  )
}

export default Profile
