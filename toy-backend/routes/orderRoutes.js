const express = require("express");
const {
  placeOrder,
  getAllOrders,
  getUserOrders,
  cancelOrder,
  getInvoice
} = require("../controllers/orderController");

const router = express.Router();

router.post("/place", placeOrder);
router.get("/", getAllOrders);
router.get("/:userId", getUserOrders);
router.delete("/:id", cancelOrder);
router.get("/invoice/:orderId", getInvoice);

module.exports = router;
