import express from "express";
import { createProduct,getProduct,deleteProduct, editproduct} from "../controlers/product.js";


const productRouter = express.Router();
productRouter.post("/", createProduct );
productRouter.get("/",getProduct );
productRouter.delete("/:productid",deleteProduct );
productRouter.put("/:productid",editproduct)

export default productRouter;