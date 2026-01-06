import express from "express";
import { createOrder } from "../controlers/oder.js";

const oderRouter = express.Router();    
oderRouter.get("/",createOrder)
export default oderRouter;