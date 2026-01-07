import express from "express";
import { createOrder, getOrders } from "../controlers/oder.js";

const oderRouter = express.Router();    
oderRouter.get("/",createOrder)
oderRouter.post("/",getOrders)
export default oderRouter;