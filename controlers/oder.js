import Order from "../models/oder.js";
import { isCustomer } from "./user.js";

export async function createOrder(req, res) {
    if(req.user==null){
        res.json({
            message:"first you have to login"
        })
        return
    }
    if(!isCustomer(req,res)){
        res.json({
            message:"only customer can create order"
        })
        return
    }
  try {
 
    const latestOrder = await Order.findOne().sort({ date: -1 });

   
    let newOrderId = "CBC0001";
    if (latestOrder) {
      const latestOrderId = latestOrder.orderId;
      const numericPart = parseInt(latestOrderId.substring(3));
      const newNumericPart = numericPart + 1;
      newOrderId = "CBC" + newNumericPart.toString().padStart(4, "0");
    }

    const orderDetails = req.body;
    orderDetails.orderId = newOrderId;
    orderDetails.email = req.user.email;
    const newOrderData = new Order(orderDetails);

    await newOrderData.save();

    res.json({ message: "Order created", orderId: newOrderId });
  } catch (err) {
    res.status(500).json({ message: "Order not created", error: err.message });
  }
}
