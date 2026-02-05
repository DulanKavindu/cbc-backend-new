import express from 'express';
import {addUser,googleLogin,loginUser} from '../controlers/user.js';

const userRouter = express.Router();
userRouter.post('/', addUser)
userRouter.post('/login', loginUser)
userRouter.post('/googleLogin',googleLogin)

export default userRouter