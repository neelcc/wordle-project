

const checkLetter = (letter,correctedWord) => {
    console.log(letter);
    // NEEIS => NEELS
    for(let i=0 ; i<correctedWord.length ; i++){
            if(correctedWord[i]===letter)
                return true
        }
        return false
    }



export const checkWord = (userWords,correctedWords) =>{
    
    const userWord = userWords.toUpperCase();
    const correctedWord = correctedWords.toUpperCase();
    const result = []

    for(let i=0 ; i<userWord.length ; i++ ){
        let isPresent = checkLetter(userWord[i],correctedWord);
        if(isPresent && userWord[i]===correctedWord[i] )
        {
            result.push("+")
        } else if (isPresent && userWord[i]!==correctedWord[i] )
        {
            result.push("*")
        }else{
            result.push("-")
        }
    }

    return result
}

export const generateGameId = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 5; i++) {
      id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return id;
  }