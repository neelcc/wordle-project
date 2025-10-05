import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from '../components/ErrorPopup';
import { FiLoader } from "react-icons/fi";

const Authentication = () => {
    const [ mode , setMode ] = useState('SignIn');
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()
    const { setUser , setToken, BACKEND_URL, setError, setShowPopup, AuthLoaders , setAuthLoaders  } = useContext(AppContext)


    useEffect(()=>{
    },[])   
    const handleAuth = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            setAuthLoaders(true)
            let endpoint = "";
            if (mode === "SignIn") { 
                endpoint = "user/register"; 
            } else if (mode === "Login") {
                endpoint = "user/login";
            }
    
            const { data } = await axios.post(`${BACKEND_URL}${endpoint}`, {
                username,
                password
            });
    
            console.log("Response:", data);
    
            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setUser(data.user);
                setAuthLoaders(false)
                navigate("/playground");
            } else {
                setAuthLoaders(false)
                console.log(`Something went wrong in ${mode} block`);
                setError(data.message);
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
            }
        } catch (err) {
            console.error("Auth error:", err);
            console.error("Backend Response:", err.response?.data); // <-- this shows the real reason
            setError(err.response?.data?.message || "Server error");
            setShowPopup(true);
            setAuthLoaders(false)
            setTimeout(() => setShowPopup(false), 3000);
        }
        
    }

  return (
    <div className='relative bg-red-300 h-screen px-4 flex justify-center items-center  ' >

        <ErrorPopup/>

        <div className=' px-8 sm:px-12 py-10 bg-[#D8B0E2] rounded-md flex flex-col gap-2 shadow-xl ' >
            <h3 className=' text-lg sm:text-2xl font-bold mb-4 text-center '> { mode==='Login' ? `Login to play the Game` : `Sign in to play the Game.` }</h3>
            <form onSubmit={handleAuth} >
            <div>
                <p className=' font-medium ' >Username</p>
                <input type="text" value={username} onChange={(e)=> setUsername(e.target.value) }  className=' outline-none border-2 border-white mt-2 rounded-md px-2 py-1 text-sm w-full  ' placeholder='Enter your Username'   />
            </div>
            <div className=' mt-4 mb-4 ' >
                <p className=' font-medium ' >Password</p>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value) }  className=' border-2 mt-2 outline-none bg- border-white  rounded-md px-2 py-1 text-sm w-full '  placeholder='Enter your Password'   />
            </div>
            <button className=' flex items-center justify-center text-center mt-2 w-full py-2 font-bold bg-yellow-100 rounded-md'>{ AuthLoaders ? <FiLoader className=' transition-all duration-500 animate-spin ' size={23} /> : (mode==='Login' ? 'Login' : 'Sign in' )}</button>
            <p onClick={()=>{ mode==='Login' ? setMode('SignIn') : setMode('Login') }} className='cursor-pointer     text-blue-800 text-center text-sm mt-2 '>{ mode==='Login' ? 'New Account? Sign in In First ' : 'Already have an Account?'}</p>
            </form>
        </div>
    </div>
  )
}

export default Authentication
