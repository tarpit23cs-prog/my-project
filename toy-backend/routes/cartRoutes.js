const express = require("express");
const {
  addToCart,
  getCart,
  removeItem
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", getCart);
router.post("/remove", removeItem);

module.exports = router;
