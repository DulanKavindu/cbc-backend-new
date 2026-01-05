import express from 'express';
import {createProduct,getProducts ,deleteProduct} from '../controlers/product.js';
import router from './student_router.js';



const productRouter = express.Router();    
productRouter.get("/",createProduct)
productRouter.post("/",getProducts)
productRouter.delete("/",deleteProduct)
export default productRouter;