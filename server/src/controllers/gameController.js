import gameModel from "../model/gameModel.js";
import userModel from "../model/userModel.js";
import { checkWord, generateGameId } from "../utils/validate-word.js";
import { five_char_words } from "../utils/word-list.js";


export const newWord = async (req,res) => {
    console.log("hi");
    
    const userToken = req.user
    const user = await userModel.findOne({username : userToken.username});

    const randomIdx = Math.floor(Math.random() * five_char_words.length );
    const randomWord = five_char_words[randomIdx];
    const gameId = generateGameId()

    await gameModel.create({
        gameId : gameId,
        gameWord : randomWord,
        user : user._id
    })

    await userModel.updateOne(user,{$inc : {"games_played" : 1 } })
    return res.status(200).send({
        success : true,
        message : "New Word!",
        user,
        gameId: gameId
    })

}

export const validateWord = async (req,res) => {

    const userToken = req.user;

    const user = await userModel.findOne({username : userToken.username});

    const { userWord , gameId } = req.body;

    const game = await gameModel.findOne({ gameId })
    
    const correctedWord = game.gameWord;

    if(userWord.length!==5){
        return res.status(404).send({
            success:false,
            message:"Word Length Exceeded!"
        })
    }

    if(userWord===correctedWord.toUpperCase() ){

        await userModel.updateOne( user, { $inc:{"games_won":1} }) 

        return res.status(200).send({
            message : "Correct Guess!",
            success : true,
            won : true,
            user
        })
    }

   const result =  checkWord(userWord,correctedWord)


    return res.status(200).send({
        message : "Working",
        result
    })
}