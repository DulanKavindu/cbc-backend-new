import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';



import userRouter from './routers/user.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
const app = express();
app.use(bodyParser.json());
const mongodburl=process.env.MONGO_DB_URI

mongoose.connect(mongodburl, {})

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb connected successfully");
})
app.use((req,res,next)=>{
  const token=req.header("Authorization")?.replace("Bearer ","");
  if(token!=null){
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if(!err){
        req.user=decoded;
        next();
      }});
        
    }
  
})



app.use("/user", userRouter);
 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
