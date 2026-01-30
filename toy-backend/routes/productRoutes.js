const express = require("express");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", addProduct);
router.put("/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
