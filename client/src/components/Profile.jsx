import React, { useContext } from 'react'
import { User } from "lucide-react";
import { AppContext } from '../context/AppContext';


const Profile = () => {


    const { user, handleLogout } = useContext(AppContext)

  return (
    <div className=' w-full border-1 border-white rounded-md cursor-pointer px-2 py-2 ' >
      { user && <div> <User size={25} />
       <p>Hii, {user.username} </p>
       </div> 
       }
       <button  onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Profile
