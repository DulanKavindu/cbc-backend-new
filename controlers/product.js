import product from "../models/product.js";
import { isAdmin } from "./user.js";

export function createProduct(req,res){
    if(req.user==null ){
        res.json({
            massage:"first you have to login"
        })

        return
    }
    if(!isAdmin(req,res)){
        res.json({
            massage:"only admin can create product"
        })
        return
    }
    const newProductData= new product(req.body);
    newProductData.save().then(()=>{
        res.json({
            massage:"product created"
        })
  
    }).catch((err)=>{
        res.json({
            massage:"product not created",
            error:err.message
        })
    })

}

 export async function getProduct(req,res){
    try{
   const list=await product.find({});
   res.json({
    list:list
   })
    }catch(err){
        res.json({
            error:err
        })
    }
}