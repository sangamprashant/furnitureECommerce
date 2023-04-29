const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Order =  mongoose.model("FURNITUREORDEREC");
const ORDEREC =  mongoose.model("FURNITUREORDEREC");
const Cart = mongoose.model("FURNITURECARTEC");
const CARTEC = mongoose.model("FURNITURECARTEC");
const User = mongoose.model("FURNITUREUSEREC");
const PRODUCTEC = mongoose.model("FURNITUREPRODUCTEC");



router.post("/setting/upload", requireLogin, (req, res) => {
  console.log(req.body);
  const { url, title, description, type, mrp, salesprice, stock, tagline } =
    req.body;

  if (!url || !title || !description || !type || !mrp || !salesprice || !stock || !tagline) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  if (isNaN(mrp) || isNaN(salesprice) || isNaN(stock)) {
    return res.status(422).json({ error: "MRP, Sales Price and Stock should be numbers" });
  }

  let actualSalesPrice = salesprice;
  if (salesprice >= mrp) {
    actualSalesPrice = mrp - 1;
  }

  const productec = new PRODUCTEC({
    title,
    description,
    type,
    mrp,
    salesprice: actualSalesPrice,
    stock,
    tagline,
    url,
    uploadedBy: req.user,
  });
  
  productec
    .save()
    .then((result) => res.json({ productec: result }))
    .catch((err) => console.log(err));
});
//getting logusers product
router.get("/myproduct", requireLogin, (req, res) => {
  PRODUCTEC.find({ uploadedBy: req.user._id })
    .populate("uploadedBy", "_id name")
    .sort("-createdAt")
    .then((myproduct) => {
      res.json(myproduct);
    });
});
//getting products for home
router.get("/product/:type", (req, res) => {
  const type = req.params.type;
  PRODUCTEC.find({ type: type }).sort("-createdAt") // sort by creation date in descending order
    .then((products) => res.json(products))
    .catch((err) => console.log(err));
    
});
//getting product by id when clicked
router.get("/product/open/:id", (req, res) => {
  const id = req.params.id;
  PRODUCTEC.findOne({ _id: id })
    .populate("uploadedBy", "uploadedBy name")
    .then((product) => {
      if (!product) {
        return res.status(404).send({error:"Product not found"});
      }
      res.json(product);
    })
    .catch((err) => console.log(err));
});
// Route to add product to cart with a specified quantity
router.post("/cart/add", requireLogin, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Check if the product is already in the cart
    const cart = await Cart.findOne({ user: userId });
    const product = await PRODUCTEC.findById(productId);

    if (product.stock <= 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (p) => p.product.toString() === productId
      );

      // If the product is already in the cart, update the quantity
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
        await cart.save();
      } else {
        // If the product is not in the cart, add it
        cart.items.push({ product: product._id, quantity });
        await cart.save();
      }
      res.status(200).json({ message: "Product added to cart" });
    } else {
      // If the user does not have a cart, create one and add the product
      const newCart = new Cart({
        user: userId,
        items: [{ product: product._id, quantity }],
      });
      await newCart.save();
      res.status(200).json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Route to fetch user's cart data
router.get("/cart", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find user's cart data
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
      a;
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//addone in cart 
router.put("/cart/add/:itemId", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.itemId;

    // Find user's cart data
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.product._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Check if the product stock is greater than 0
    if (cart.items[itemIndex].product.stock <= 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // Check if the quantity of the item being added is greater than the available stock
    const productStock = cart.items[itemIndex].product.stock;
    const currentQuantity = cart.items[itemIndex].quantity;
    const requestedQuantity = currentQuantity + 1;
    if (requestedQuantity > productStock) {
      return res.status(400).json({ message: `Only ${productStock} items are available` });
    }

    // Update the quantity of the item by one
    cart.items[itemIndex].quantity++;

    // Save the updated cart
    await cart.save();
    return res.status(200).json({ message: "Item added in the cart" });

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//remove one 
router.put("/cart/remove/:itemId", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.itemId;

    // Find user's cart data
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.product._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Reduce the quantity of the item by one
    cart.items[itemIndex].quantity--;
 
    // If the quantity is zero, remove the item from the cart
    if (cart.items[itemIndex].quantity === 0) {
      cart.items.splice(itemIndex, 1);
    }

    // Save the updated cart
    await cart.save();
    
    return res.status(200).json({ message: "Item removed from the cart" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//remove item from cart
router.delete("/cart/:cartId/item/:itemId", async (req, res) => {
  const { cartId, itemId } = req.params;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//make order
router.post("/order/done", requireLogin, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) {
      return res.status(400).json({ error: "Cart not found" });
    }

    // Prompt user for delivery address, name, and mobile number
    const { deliveryAddress, name, mobileNumber } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!mobileNumber || mobileNumber.length!==10) {
      return res.status(400).json({ error: "Mobile number is required" });
    }
    if (!deliveryAddress) {
      return res.status(400).json({ error: "Delivery address is required" });
    }

    // Process each item as a separate order
    for (const item of cart.items) {
      // Check if the product is in stock
      if (item.product.stock <= 0) {
        return res.status(400).json({ error: "Product is out of stock" });
      }
      // Reduce the stock of the product by the quantity bought
  item.product.stock -= item.quantity;
  await item.product.save();
      
      const order = new Order({
        user: req.user._id,
        items: [{
          product: item.product,
          quantity: item.quantity,
          price: item.product.salesprice,
        }],
        totalPrice: item.quantity * item.product.salesprice,
        deliveryAddress: deliveryAddress,
        boughtBy: name,
        mobileNumber: mobileNumber,
        seller: item.product.uploadedBy.toString()
      });
      await order.save();
    }

    await Cart.updateOne({ user: req.user._id }, { $set: { items: [], grandPrice: 0 } });

    res.json({ message: "Checkout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
//get my orders made 
router.get("/my/orders", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all orders made by the user
    const orders = await Order.find({ user: userId })
      .populate({
        path: "items.product",
        select: "-createdAt -updatedAt",
      }).sort("-createdAt") // sort by creation date in descending order
      .lean();

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// GET /orders/status
router.get("/orders/status", requireLogin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.product",
        model: "FURNITUREPRODUCTEC",
        populate: {
          path: "uploadedBy",
          model: "FURNITUREUSEREC",
          select: "name email",
        },
        select: "-__v",
      })
      .sort("-createdAt")
      .lean();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const result = {
      packingOrders: [],
      confirmedOrders: [],
      shippedOrders: [],
      deliveredOrders: [],
      canceledOrders: [],
    };

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.product.uploadedBy && item.product.uploadedBy._id && item.product.uploadedBy._id.toString() === req.user._id.toString()) {
          switch (order.status) {
            case "Confirmed":
              result.confirmedOrders.push(order);
              break;
            case "Packing":
              result.packingOrders.push(order);
              break;
            case "Shipped":
              result.shippedOrders.push(order);
              break;
            case "Delivered":
              result.deliveredOrders.push(order);
              break;
            case "Canceled":
              result.canceledOrders.push(order);
              break;
          }
        } else if (!item.product.uploadedBy) {
          // Remove the item from the order if the product is deleted
          order.items = order.items.filter((i) => i.product.toString() !== item.product._id.toString());
        }
      });
    });


    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// changing status of order 
router.put("/orders/:orderId/status", requireLogin, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findOne({ _id: orderId })
      .populate({
        path: "items.product",
        model: "FURNITUREPRODUCTEC",
        select: "uploadedBy",
      })
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.items.some((item) => item.product.uploadedBy == req.user.id)) {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { status },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } else {
      res.status(403).json({
        message: "You are not authorized to change the status of this order",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// PUT route to cancel an order
router.put("/orders/:orderId/cancel", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.orderId;

    // Find the order by ID and user ID
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status to "Canceled"
    order.status = "Canceled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
//random sale data fetch 
router.get('/product/sale/:sale', async (req, res) => {
  try {
    const salePercentage = parseInt(req.params.sale);
    const products = await PRODUCTEC.find({ salesprice: { $gt: 100 - salePercentage - 10, $lt: 100 - salePercentage + 10 } }).exec();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
//all product fetch
router.get('/products', async (req, res) => {
  try {
    const products = await PRODUCTEC.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
//search
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const products = await PRODUCTEC.find({ title: { $regex: query, $options: 'i' } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
//detete product
router.delete('/product/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await PRODUCTEC.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // remove product from cart and order
    await CARTEC.updateMany(
      {},
      { $pull: { items: { product: id } } },
      { multi: true }
    );
    await ORDEREC.updateMany(
      {},
      { $pull: { items: { product: id } } },
      { multi: true }
    );

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;