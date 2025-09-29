import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const navigate = useNavigate()
    const [ user , setUser ] = useState(null)
    const [ token , setToken ] = useState(localStorage.getItem('token'))
    const [ selectedKey , setSelectedKey ] = useState('')
    const [ board , setBoard ] = useState([['','','','',''],['','','','',''], 
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ])
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
      
    const [ filledRows , setFilledRows ] = useState(0)
    const [ selectedRow , setSelectedRow ] = useState(0)

    const getPoints = async () => {
        const { data } = await axios.get(`${BACKEND_URL}user/points`,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if(data.success){
            setUser(data.user)
            console.log(data.user);
            
        }
        else{
            console.log("Error in getPoints Block");
        }
    }
    
    useEffect(()=>{
        getPoints()
    },[token])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setToken(null)
        setBoard([['','','','',''],['','','','',''], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ])
          navigate('/')
    }

    const value = {
        selectedKey,
        setSelectedKey,
        board,
        setBoard,
        selectedRow,
        setSelectedRow,
        token,
        setToken,
        user,
        setUser,
        handleLogout
    }

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>

    )

}
