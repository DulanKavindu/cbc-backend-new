import Order from "../models/oder.js";
import product from "../models/product.js";
import { isCustomer } from "./user.js";

export async function createOrder(req, res) {
  if (req.user == null) {
    res.json({
      message: "first you have to login"
    });
    return;
  }
  
  if (!isCustomer(req, res)) {
    res.json({
      message: "only customer can create order"
    });
    return;
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
    const productArray = [];
    for (let i = 0; i < orderDetails.orderedItems.length; i++) {
      const productData = await product.findOne({ productId: orderDetails.orderedItems[i].productId });

      if (productData == null) {
        res.json({
          message: "product id " + orderDetails.orderedItems[i].productId + " not found"
        });
        return;
      } else {
        productArray[i] = {
          name: productData.productname,
          price: productData.price,
          quantity: orderDetails.orderedItems[i].quantity,
          image: productData.image[0]
        };
      }
    }

    orderDetails.orderedItems = productArray;
    orderDetails.orderId = newOrderId;
    orderDetails.email = req.user.email;

    const newOrderData = new Order(orderDetails);
    await newOrderData.save();

    res.json({ 
      message: "Order created", 
      orderId: newOrderId 
    });

  } catch (err) {
    res.status(500).json({ 
      message: "Order not created", 
      error: err.message 
    });
  }
}

export function getOrders(req, res) {
  
  Order.find().then((list) => {
    res.json({
      list: list
    });
  }).catch((err) => {
    res.json({
      error: err
    });
  });
}