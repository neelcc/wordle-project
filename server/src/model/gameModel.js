import mongoose from 'mongoose'


const gameSchema = mongoose.Schema({
    gameId : { type:String },
    gameWord : { type : String },
    user : { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     }
})

const gameModel = mongoose.model("Game",gameSchema)


export default gameModel