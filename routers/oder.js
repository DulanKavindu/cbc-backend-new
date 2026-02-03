import express from "express";
import { createOrder, getOrders, getQuter } from "../controlers/oder.js";

const oderRouter = express.Router();    
oderRouter.post("/",createOrder)
oderRouter.get("/",getOrders)
oderRouter.post("/getquoter",getQuter)
export default oderRouter;