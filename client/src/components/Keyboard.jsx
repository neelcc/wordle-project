import { CircleX } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Bounce, toast } from "react-toastify";

const Keyboard = () => {
    
    const { setSelectedKey, setBoard, board, selectedRow, setSelectedRow, selectedKey } = useContext(AppContext)
    
  

    const UpdateBoard = (letter) => {
      setBoard( prevBoard => {

        const newBoard = prevBoard.map(row=>[...row])
        
        
        const colIndex = newBoard[selectedRow].findIndex(cell=>cell==="")


        if(letter==='CX' && newBoard[selectedRow][0]!=='' ){
          for(let i=0 ; i < 4 ; i++ ){
            if(newBoard[selectedRow][i+1]==='' && newBoard[selectedRow][i] !== '' ){
              newBoard[selectedRow][i] = ''
              break;
            }
          }
          console.log(newBoard[selectedRow]);
          
        }

        if(letter==='ENTER' && newBoard[selectedRow][4]==='' ){
           toast('Please Fill The Words', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
            return prevBoard
        }

        if(letter==='ENTER' && newBoard[selectedRow][4]!=='' ){
          setSelectedRow((prev)=>prev+1)
        }
        
        if(colIndex!==-1 && letter!=="ENTER" && letter!=='CX' ){
          console.log("ami working");
          newBoard[selectedRow][colIndex] = letter
          console.log(colIndex);
        }
        
        console.log(newBoard);


      
        return newBoard
      })
    
    };

    const handleKey = (e) => {
      let row = e.target.getAttribute('row-no')
      let letter = e.target.getAttribute('letter')
      setSelectedKey(letter)
      console.log(letter);
      
      UpdateBoard(letter)
    }

  return (
    <div className="space-y-2 px-2 ">
  <div className="flex justify-center gap-1">
    {["Q","W","E","R","T","Y","U","I","O","P"].map((k,idx) => (
      <div row-no={1} letter={k} onClick={handleKey} key={`row-1-${k}-${idx}`}  className=" cursor-pointer min-h-9 text-xl min-w-7 bg-red-50 rounded-md flex justify-center items-center font-bold text-gray-700">{k}</div>
    ))}
  </div>

  <div className="flex justify-center gap-1">
    {["A","S","D","F","G","H","J","K","L" ].map((k,idx) => (
      <div row-no={2} letter={k} onClick={handleKey} key={`row-2-${k}-${idx}`}  className={`min-h-9 text-xl bg-red-50 rounded-md flex cursor-pointer justify-center items-center min-w-7 font-bold text-gray-700 `}>
        {k}
      </div>
    ))}
  </div>

  <div  className="flex justify-center gap-1">
    {["ENTER","Z","X","C","V","B","N","M","CX"].map((k,idx) => (
      <div row-no={3} letter={k} onClick={handleKey} key={`row-3-${k}-${idx}`}  className={`min-h-9 text-xl bg-red-50 rounded-md flex justify-center cursor-pointer items-center font-bold text-gray-700 ${k==="CX" || k==="ENTER" ? "px-1" : "min-w-7"}`}>
        { k==="CX" ? <CircleX height={18} /> : k }
      </div>
    ))}
  </div>    
</div>

  );
};

export default Keyboard;
