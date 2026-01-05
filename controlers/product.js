import products from "../models/product.js";

function createProduct(req, res) {
    if(req.user==null){
        res.json({
            massage:"first you have to login"
        })
        return
    }
    if(req.user.type!="admin"){
        res.json({
            massage:"only admin can create product"
        })
        return
    }
    const newproduct = new products(req.body);
    newproduct.save().then(()=>{
        res.json({
            message: "Product Created Successfully"

        })
    }).catch((err)=>{
        res.status(400).json({
            message: "Error in Creating Product",
            error: err
        })
    })
      

}
function getProducts(req, res) {
    products.find().then((productlist)=>{
        res.json({
            products: productlist
        })
    }).catch((err)=>{
        res.status(400).json({
            message: "Error in Fetching Products",
            error: err
        })
    })
}
function deleteProduct(req, res) {
    products.deleteOne({name: req.body.name}).then(()=>{
        res.json({
            message: "Product Deleted Successfully"
        })
    })
}
   

export { createProduct, getProducts,deleteProduct };