import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FileChartColumnIncreasingIcon } from "lucide-react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    
    const navigate = useNavigate()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [ gameId , setGameId ] = useState(localStorage.getItem('gameId'))
    const [ token , setToken ] = useState(localStorage.getItem('token'))
    const [ user , setUser ] = useState(null)
    const [ selectedKey , setSelectedKey ] = useState('')
    const [ ans , setAns ] = useState('');
    const [ selectedRow , setSelectedRow ] = useState(0)
    const [ showResultModal , setShowResultModal ] = useState(false)
    const [ isWon, setIsWon ] = useState(true)
    const [ resultRow, setResultRow ] = useState(['','','','',''])
    const [ board , setBoard ] = useState([['','','','',''],['','','','',''], 
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ])
    const [ resultBoard , setResultBoard ] = useState([['','','','',''],['','','','',''], 
    ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ])
    
    
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
        if(token!==null)   {
          getPoints()
          console.log("boardyyy",resultBoard);
        }
    },[token])


    const handleStartGame = async () => {
        const { data } = await axios.get(`${BACKEND_URL}wordle/new-word`,{
            headers : {
                'Authorization' : 'Bearer ' + token 
            }
        })

        if(data.success){
            setGameId(data.gameId)
            localStorage.setItem('gameId',data.gameId)
        }
        
    }

    const handleGuess = async (Word) => {
        const { data } = await axios.post(`${BACKEND_URL}wordle/validate-word`,{
            userWord : Word,
            gameId : gameId,
            row : selectedRow
        },{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if(data.success){
            console.log(data.result);
            console.log(data.message);  
            setResultRow(data.result)
            UpdateResultBoard(data.result);
            if(data.won===true){
                setAns(data.ans);
                setShowResultModal(true)
            }
            if(data.won==='Lose'){
                setIsWon(false)
                setAns(data.ans)
                setShowResultModal(true)
            }
        }
    }


    const UpdateResultBoard = (resultRow) => {
        console.log("heu");
        
        setResultBoard(
            prevBoard => prevBoard.map((row,i) => i===selectedRow ? resultRow : row )
        )

    }

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
          setGameId(null)
          localStorage.removeItem('gameId')
    }


    const handlePlayAgain = () => {
        localStorage.removeItem('gameId')
        setGameId(null)
        navigate('/playground')
        setShowResultModal((prev)=>!prev)
        setIsWon(false)
        handleStartGame()
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
        handleLogout,
        gameId,
        handleGuess,
        setGameId,
        handleStartGame,
        resultBoard,
        setResultBoard,
        resultRow,
        setShowResultModal,
        showResultModal,
        handlePlayAgain,
        ans,
        isWon,
        setIsWon
    }

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>

    )

}
