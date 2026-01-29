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

export function deleteProduct(req, res) {
 
  if (!req.user) {
    return res.status(401).json({ massage: "first you have to login" });
  }

 
  if (req.user.type !== "admin") {
    return res.status(403).json({ massage: "only admin can delete product" });
  }


  const productidd = req.params.productid;

  product.deleteOne({ productid: productidd })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ massage: "Product not found in DB" });
      }
      res.json({ massage: "product deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        massage: "product not deleted",
        error: err.message
      });
    });
}

export function editproduct(req,res){
    if(!isAdmin(req,res)){
        res.json({     
            massage:"only admin can edit product" 

        })
        return

    }
    const productid= req.params.productid
    const newProductData = req.body
    product.updateOne({productid:productid},newProductData).then(()=>{  
        res.json({
            massage:"product updated"
        })

    }).catch((error)=>{
       res.json({
        error:error
       })
    })
}
export async function getProductById(req,res){
    const productid=req.params.productid   
    try{
        const productData = await product.findOne({productid:productid})
        res.json({
            product:productData
        })
    }catch(err){
        res.json({
            error:err.message
        })
    }

}

