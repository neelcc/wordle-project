import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    
    const navigate = useNavigate()
    const BACKEND_URL=import.meta.env.VITE_ONRENDER_URL
    const [ gameId , setGameId ] = useState(localStorage.getItem('gameId'))
    const [ token , setToken ] = useState(localStorage.getItem('token'))
    const [ user , setUser ] = useState(null)
    const [ selectedKey , setSelectedKey ] = useState('')
    const [ ans , setAns ] = useState('');
    const [ selectedRow , setSelectedRow ] = useState(0)
    const [ showResultModal , setShowResultModal ] = useState(false)
    const [ isWon, setIsWon ] = useState(true)
    const [ resultRow, setResultRow ] = useState(['','','','',''])
    const [ board , setBoard ] = useState([
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ])
    const [ resultBoard , setResultBoard ] = useState([['','','','',''],
        ['','','','',''], 
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ])
    const initialKeyColors = {
        Q: "bg-gray-200", W: "bg-gray-200", E: "bg-gray-200", R: "bg-gray-200",
        T: "bg-gray-200", Y: "bg-gray-200", U: "bg-gray-200", I: "bg-gray-200",
        O: "bg-gray-200", P: "bg-gray-200",
        A: "bg-gray-200", S: "bg-gray-200", D: "bg-gray-200", F: "bg-gray-200",
        G: "bg-gray-200", H: "bg-gray-200", J: "bg-gray-200", K: "bg-gray-200",
        L: "bg-gray-200",
        Z: "bg-gray-200", X: "bg-gray-200", C: "bg-gray-200", V: "bg-gray-200",
        B: "bg-gray-200", N: "bg-gray-200", M: "bg-gray-200", CX: "bg-gray-200", ENTER: "bg-gray-200"
    };
    const [keyColors, setKeyColors] = useState(initialKeyColors);
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(true);
    const [ AuthLoaders , setAuthLoaders ] = useState(false)    
    const [ startGameLoader , setStartGameLoader ] = useState(false)
    const [ getUserLoader, setGetUserLoader ] = useState(false)
    
    useEffect(()=>{
        if(token!==null)   {
          getPoints()
          console.log("boardyyy",resultBoard);
        }
    },[token])

    
    const getPoints = async () => {
        setGetUserLoader(true)
        const { data } = await axios.get(`${BACKEND_URL}user/points`,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if(data.success){
            console.log(data);
            console.log(data.user)
            setUser(data.user)
            console.log(data.user);

            setGetUserLoader(false)
        }   
        else{
            console.log("Error in getPoints Block");
        }
    }

    const handleStartGame = async () => {
        setAuthLoaders(true)
        const { data } = await axios.get(`${BACKEND_URL}wordle/new-word`,{
            headers : {
                'Authorization' : 'Bearer ' + token 
            }
        })

        if(data.success){
            setGameId(data.gameId)
            localStorage.setItem('gameId',data.gameId)
            setSelectedRow(0)
            setStartGameLoader(false)    
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
        
        console.log(data);
        

        if(data.success){
            console.log(data.result);
            console.log(data.message);  
            setResultRow(data.result)
            UpdateResultBoard(data.result);
            if(data.won===true){
                setIsWon(true)
                setAns(data.ans);
                setUser(prevUser => ({
                    ...prevUser,
                    games_played: data.user.games_played,
                    games_won: data.user.games_won
                }) )

                console.log(user);
                
                
                console.log(data.user.games_won);
                
                setTimeout(()=>{
                    setShowResultModal(true)
                },1000)
            }
            if(data.won==='Lose'){
                setIsWon(false)
                setAns(data.ans)
                setTimeout(()=>{
                    setShowResultModal(true)
                },1000)
            }
        }
    }


    const goToHome = () => {
        localStorage.removeItem('gameId')
        setGameId(null)
        setShowResultModal((prev)=>!prev)
        setIsWon(false)
        setKeyColors(initialKeyColors)
        setResultBoard([['','','','',''],
            ['','','','',''], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ])
        setBoard([['','','','',''],['','','','',''], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ])
    }



    const getNewColor = (oldColor, status) => {
    const colorMap = {
      "+": "bg-green-500",   // correct position
      "*": "bg-yellow-300",  // in word, wrong place
      "-": "bg-red-300"      // not in word
    };
  
    const newColor = colorMap[status];
  
    // priority logic (don't downgrade colors)
    if (oldColor === "bg-green-500") return oldColor; // stay green
    if (oldColor === "bg-yellow-300" && newColor === "bg-red-300") return oldColor; // don't downgrade yellow -> red
    return newColor || oldColor; // fallback: keep old if status undefined
    };
  
    const UpdateResultBoard = (resultRow) => {
        console.log("robo",resultRow);
        
        setResultBoard(
            prevBoard => prevBoard.map((row,i) => i===selectedRow ? resultRow : row )
        )

        console.log(resultBoard);
        console.log("------------------");
        console.log(board);
        console.log("------------------");
        console.log(resultRow);
        console.log("------------------");
        console.log(selectedRow);    
        console.log("------------------");
        

        
        setKeyColors(prevColors => {
            const updatedColors = { ...prevColors };
          
            // iterate through board + resultBoard
              for (let j = 0; j < board[selectedRow].length; j++) {
                const letter = board[selectedRow][j];
                const status = resultRow[j];

                console.log("letter",letter);
                console.log("status",status);
                

                if (letter) {
                  const oldColor = updatedColors[letter] || "bg-gray-200";
                  console.log("oldColor",oldColor);
                  
                  updatedColors[letter] = getNewColor(oldColor, status);
                  console.log("updateColor[letter]",updatedColors[letter]);
                }
              }
            
          
            return updatedColors;
          });
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
        setResultBoard([['','','','',''],
            ['','','','',''], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ])
          navigate('/')
          setGameId(null)
          setAns('')
          setKeyColors(initialKeyColors)
          localStorage.removeItem('gameId')
    }


    const handlePlayAgain = () => {
        localStorage.removeItem('gameId')
        localStorage.removeItem('board')
        setGameId(null)
        setShowResultModal((prev)=>!prev)
        setIsWon(false)
        setKeyColors(initialKeyColors)
        setResultBoard([['','','','',''],
            ['','','','',''], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ])
        setBoard([['','','','',''],['','','','',''], 
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
        ])
        setStartGameLoader(true)
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
        setIsWon,
        keyColors,
        setKeyColors,
        BACKEND_URL,
        error,
        setError,
        showPopup,
        setShowPopup,
        AuthLoaders,
        setAuthLoaders,
        setStartGameLoader,
        startGameLoader,
        getUserLoader,
        setGetUserLoader,
        goToHome
    }

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>

    )

}
