import express from "express";
import { createProduct,getProduct } from "../controlers/product.js";


const productRouter = express.Router();
productRouter.get("/", createProduct );
productRouter.post("/", getProduct);

export default productRouter;