import Order from "../models/oder.js";
import product from "../models/product.js";
import { isCustomer } from "./user.js";

export async function createOrder(req, res) {
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


    const orderDetails = req.body.orderDetails; 
    const productArray = [];
  
    let total = 0; 
    console.log(orderDetails.length);
    for (let i = 0; i < orderDetails.length; i++) {
      
      const productData = await product.findOne({ productid: orderDetails[i].productId });

      if (productData == null) {
        res.json({
          message: "product id " + orderDetails[i].productId + " not found"
        });
        return;
      } else {
        productArray[i] = {
          name: productData.productname,
          price: productData.lasprice,
          quantity: orderDetails[i].quantity,
          discount: productData.price - productData.lasprice,
          image: productData.image[0]
        };
      }
    }

   
    const finalOrderDetails = {
        orderedItems: productArray,
        orderId: newOrderId,
        email: req.user.email,
        date: new Date(),
        phone: req.body.phone,
        name: req.user.firstname + " " + req.user.lastname,
        address: req.body.address,
    };

    const newOrderData = new Order(finalOrderDetails);
    await newOrderData.save();

    res.json({ 
      message: "Order created", 
      orderId: newOrderId 
    });

  } catch (err) {
    console.log(err);
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

export async function getQuter(req, res) {
  let total = 0;
  let labaleTotal = 0;

  try {
    const orderDetails = req.body.orderDetails;
    const productArray = [];

    for (let i = 0; i < orderDetails.length; i++) {
      const productData = await product.findOne({ productid: orderDetails[i].productId });

      if (productData == null) {
        res.status(404).json({
          message: "product id " + orderDetails[i].productId + " not found"
        });
        return;
      } else {
        productArray[i] = {
          name: productData.productname,
          price: productData.lasprice,
          quantity: orderDetails[i].quantity,
          image: productData.image[0]
        };

        total += productData.lasprice * orderDetails[i].quantity;
        labaleTotal += productData.price * orderDetails[i].quantity;
      }
    }

    res.json({
      orderedItems: productArray,
      totalPrice: total,
      labaleTotal: labaleTotal
    });

  } catch (err) {
    res.status(500).json({ 
      message: "Order calculation failed", 
      error: err.message 
    });
  }
}