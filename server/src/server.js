import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import ConnectDB from './db/index.js';
import gameRouter from './routes/gameRoutes.js';
import seedrandom from 'seedrandom'
import { five_char_words } from './utils/word-list.js';

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["https://wordle-project-flax.vercel.app"], 
    credentials: true
}))
const PORT = process.env.PORT || 3000


app.use('/api/v1/user',userRouter)
app.use('/api/v1/wordle',gameRouter)



app.get('/',( req,res )=>{
    
    res.send({
        "mssg" : "Hello from server!",
    })
})

ConnectDB()


app.listen(PORT,()=>{
    console.log("Server is running!");  
})

console.log(PORT);


