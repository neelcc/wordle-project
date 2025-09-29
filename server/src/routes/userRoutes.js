import express from 'express'
import { getPoints, userLogin, userRegister } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', userRegister )
userRouter.post('/login', userLogin )
userRouter.get('/points',auth, getPoints )



export default userRouter   