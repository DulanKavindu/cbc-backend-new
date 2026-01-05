import express from 'express';
import {addUser,loginUser} from '../controlers/user.js';

const userRouter = express.Router();
userRouter.post('/', addUser)
userRouter.post('/login', loginUser)

export default userRouter