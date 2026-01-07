import express from "express";
import { createProduct,getOrders} from "../controlers/product.js";


const productRouter = express.Router();
productRouter.get("/", createProduct );
productRouter.post("/", getOrders);

export default productRouter;