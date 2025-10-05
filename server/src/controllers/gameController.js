import gameModel from "../model/gameModel.js";
import userModel from "../model/userModel.js";
import { checkWord, generateGameId } from "../utils/validate-word.js";
import { five_char_words } from "../utils/word-list.js";
import { userRegister } from "./userController.js";


export const newWord = async (req,res) => {
    console.log("working");
    
    const userToken = req.user
    const user = await userModel.findOne({username : userToken.username});

    const randomIdx = Math.floor(Math.random() * five_char_words.length );
    const randomWord = five_char_words[randomIdx];
    const gameId = generateGameId()

    console.log("gameid ",gameId);
    

    await gameModel.create({
        gameId : gameId,
        gameWord : randomWord,
        user : user._id
    })

    const UpdatedUser = await userModel.findOneAndUpdate(user,{$inc : {"games_played" : 1 } } , { new:true })

    const { password , ...UserwoPassword } = UpdatedUser.toObject() 

    return res.status(200).send({
        success : true,
        message : "New Word!",  
        user : UserwoPassword,
        gameId: gameId
    })

}

export const validateWord = async (req,res) => {

    const userToken = req.user;

    const user = await userModel.findOne({username : userToken.username});

    const { userWord , gameId, row } = req.body;

    const game = await gameModel.findOne({ gameId })
    
    const correctedWord = game.gameWord;

    if(userWord.length!==5){
        return res.status(404).send({
            success:false,
            message:"Word Length Exceeded!"
        })
    }

    if(userWord===correctedWord.toUpperCase() ){

    const UpdatedUser = await userModel.findOneAndUpdate( {_id: user._id }, { $inc:{"games_won":1} } , {new: true}) 

    console.log("_______________________");
    
    console.log(UpdatedUser);
    
    
    const { password , ...UserwoPassword } = UpdatedUser.toObject()    

    
        return res.status(200).send({
            message : "Correct Guess!",
            success : true,
            won : true,
            user : UserwoPassword ,
            result : ["+","+","+","+","+"],
            ans :correctedWord
        })
    }

    console.log("row is",row);
    

   const result =  checkWord(userWord,correctedWord)

   if(row===5 && userWord!==correctedWord.toUpperCase() )
   {
    return res.status(200).send({
        success:true,
        message : "Working",
        result,
        ans: correctedWord,
        won : "Lose"
    })
   }

    return res.status(200).send({
        success:true,
        message : "Working",
        result,
        ans: correctedWord,
        won : false
    })
}

export const leaderBoard = async (req,res) => {
    const userToken = req.user;

    const user = await userModel.findOne({username : userToken.username})



    const data = await userModel.find().sort({games_won : -1 }).select('username games_won').limit(5).exec()

    console.log(data);
    
    res.status(200).send({
        success : true,
        leaderboard : data
    })

}