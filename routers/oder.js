import express from "express";
import { createOrder, getOrders, getQuter, updateOrder } from "../controlers/oder.js";

const oderRouter = express.Router();    
oderRouter.post("/",createOrder)
oderRouter.get("/",getOrders)
oderRouter.post("/getquoter",getQuter)
oderRouter.put("/:orderId",updateOrder)
export default oderRouter;