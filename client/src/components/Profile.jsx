import React, { useContext } from 'react'
import { User } from "lucide-react";
import { AppContext } from '../context/AppContext';
import StaggeredDropDown from './DropdownUser';
import { FiLoader } from 'react-icons/fi';


const Profile = () => {


    const { user, gameId } = useContext(AppContext)

  return (
    <div className={`max-sm:w-full sm:w-120 border-2 border-white bg-cyan-100/70 rounded-md cursor-pointer px-2 py-2 sm:py-1 xl:py-2 ${ user ? "" : "flex items-center justify-center" } `}  >
      { user ? <div className={` ${gameId===null ? "justify-center" : "justify-around sm:justify-between"  } flex items-center `} >
        <span className=' flex items-center gap-1 ' > <User size={25} />
        <StaggeredDropDown/>
       </span>
       <p className=' font-medium ' >{gameId!==null && `Game Id: ${gameId}` }</p>
       </div> : <FiLoader size={26} className=' my-1 transition-all duration-300 animate-spin ' />
        }
    </div>
  )
}

export default Profile
