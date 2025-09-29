import express from 'express'
import { auth } from '../middleware/auth.js'
import { newWord, validateWord } from '../controllers/gameController.js'

const gameRouter = express.Router()

gameRouter.get('/new-word',auth, newWord )
gameRouter.post('/validate-word', auth , validateWord )


export default gameRouter