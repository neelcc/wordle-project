import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username : { type:String , required:true },
    password : { type:String , required:true },
    games_played : { type:Number , default:0 },
    games_won : { type:Number, default:0 },
    games_streak : { type:Number, default:0 }
})

const userModel = mongoose.model("User",userSchema)


export default userModel 
