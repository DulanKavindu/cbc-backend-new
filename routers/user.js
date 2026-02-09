import express from 'express';
import {addUser,getUser,googleLogin,loginUser} from '../controlers/user.js';

const userRouter = express.Router();
userRouter.post('/', addUser)
userRouter.post('/login', loginUser)
userRouter.post('/googleLogin',googleLogin)
userRouter.get("/",getUser)
export default userRouter