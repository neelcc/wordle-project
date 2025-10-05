import express from 'express'
import { auth } from '../middleware/auth.js'
import { leaderBoard, newWord, validateWord } from '../controllers/gameController.js'

const gameRouter = express.Router()

gameRouter.get('/new-word',auth, newWord )
gameRouter.post('/validate-word', auth , validateWord )
gameRouter.get('/leaderboard',auth, leaderBoard)


export default gameRouter