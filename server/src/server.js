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

const allowedOrigins = [
    "http://localhost:5173",
    "https://wordle-project-flax.vercel.app",
    "https://wordle-project-hfq2xd1mq-neel-chaurasiyas-projects.vercel.app"
  ];
  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true); // allow curl or mobile
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));

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


