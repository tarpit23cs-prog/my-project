const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product || product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product not available"
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const index = cart.items.findIndex(
        i => i.productId.toString() === productId
      );

      if (index > -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
      await cart.save();
    }

    res.json({
      success: true,
      message: "Product added to cart"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// VIEW CART
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price image"
    );

    if (!cart) {
      return res.json({
        success: true,
        data: { items: [], totalAmount: 0 }
      });
    }

    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.productId.price * item.quantity;
    });

    res.json({
      success: true,
      data: {
        items: cart.items,
        totalAmount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// REMOVE ITEM (optional but useful)
exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      i => i.productId.toString() !== productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Item removed from cart"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
