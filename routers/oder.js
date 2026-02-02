import express from "express";
import { createOrder, getOrders, getQuter } from "../controlers/oder.js";

const oderRouter = express.Router();    
oderRouter.get("/",createOrder)
oderRouter.post("/",getOrders)
oderRouter.get("/:getquoter",getQuter)
export default oderRouter;