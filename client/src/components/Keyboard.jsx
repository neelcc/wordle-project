import { CircleX } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Bounce, toast } from "react-toastify";


const Keyboard = () => {
    
    const { setSelectedKey, setBoard, board, keyColors, selectedRow, handleGuess, setSelectedRow, selectedKey } = useContext(AppContext)
    const [ keyboardOne, setKeyboardOne ] = useState(["Q","W","E","R","T","Y","U","I","O","P"])
    const [ keyboardTwo, setKeyboardTwo ] = useState(["A","S","D","F","G","H","J","K","L" ])
    const [ keyboardThree, setKeyboardThree ] = useState(["ENTER","Z","X","C","V","B","N","M","CX"])
  

    const UpdateBoard = (letter) => {
          setBoard( prevBoard => {

        const newBoard = prevBoard.map(row=>[...row])
        console.log("board",newBoard);
        
        
        let colIndex = newBoard[selectedRow].findIndex(cell=>cell==="")

        console.log("column: ",colIndex);
        
        
        if(letter==='CX'){
          let idx = newBoard[selectedRow].slice().reverse().findIndex(cell => cell !== '');
          if (idx !== -1) {
             idx = 4 - idx; // reverse index adjustment
              newBoard[selectedRow][idx] = '';
          }
          }
          
        if(letter==='ENTER' ){
          if (selectedRow < newBoard.length - 1 && !newBoard[selectedRow].some(cell=>cell==='') ) {
            setSelectedRow(prev => prev + 1);
          }

          if(newBoard[selectedRow].some(cell=>cell==='')){
            toast('Please Fill The Words', {
              toastId: 'empty-row',
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: true,
              theme: "light",
              transition: Bounce,
            });
            return prevBoard 
          }else{
            const Word = newBoard[selectedRow].join("");
            handleGuess(Word)
          }
        }

      
        if(colIndex!==-1 && letter!=="ENTER" && letter!=='CX' ){
          newBoard[selectedRow][colIndex] = letter
        }

        return newBoard
      })
    
    };

    const handleKey = (letter) => {
      setSelectedKey(letter)
      UpdateBoard(letter)
    }

  return (
    <div className="space-y-2 px-2 ">
  <div className="flex justify-center gap-1">
    {keyboardOne.map((k,idx) => (
      <div row-no={1}  onClick={()=>handleKey(k)} key={`row-1-${k}-${idx}`}  className={`  cursor-pointer min-h-9 text-xl min-w-7 transition-colors ease-in duration-200 ${keyColors[k]||"bg-color-200"} rounded-md flex justify-center items-center font-bold text-gray-700`}>{k}</div>
    ))}
  </div>

  <div className="flex justify-center gap-1">
    {keyboardTwo.map((k,idx) => (
      <div row-no={2}  onClick={()=>handleKey(k)} key={`row-2-${k}-${idx}`}  className={` transition-colors ease-in duration-200 ${keyColors[k]||"bg-color-200"} min-h-9 text-xl  rounded-md flex cursor-pointer justify-center items-center min-w-7 font-bold text-gray-700 `}>
        {k}
      </div>
    ))}
  </div>

  <div  className="flex justify-center gap-1">
    {keyboardThree.map((k,idx) => (
      <div row-no={3}  onClick={()=>handleKey(k)} key={`row-3-${k}-${idx}`}  className={`min-h-9 transition-colors ease-in duration-200 ${keyColors[k]||"bg-gray-200"} text-xl  rounded-md flex justify-center cursor-pointer items-center font-bold text-gray-700 ${k==="CX" || k==="ENTER" ? "px-1" : "min-w-7"}`}>
        { k==="CX" ? <CircleX height={18}  /> : k }
      </div>
    ))}
  </div>    
</div>

  );
};

export default Keyboard;
