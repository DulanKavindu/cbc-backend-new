import mongoose from "mongoose";

const productSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

 const products =mongoose.model("Product", productSchema);
 export default products