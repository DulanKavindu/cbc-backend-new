import express from "express";
import { createProduct,getProduct,deleteProduct} from "../controlers/product.js";


const productRouter = express.Router();
productRouter.post("/", createProduct );
productRouter.get("/",getProduct );
productRouter.delete("/:productid",deleteProduct );

export default productRouter;