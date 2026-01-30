// const Product = require("../models/Product");
// const User = require("../models/User");

// // ADD PRODUCT (ADMIN)
// exports.addProduct = async (req, res) => {
//   try {
//     const { userId, name, description, image, price, stock } = req.body;

//     const user = await User.findById(userId);
//     if (!user || user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin access only"
//       });
//     }

//     if (!name || !description || !image || !price || stock == null) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     const product = await Product.create({
//       name,
//       description,
//       image,
//       price,
//       stock
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       data: product
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, stock, image } = req.body;

//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         price,
//         stock,
//         image
//       },
//       { new: true }
//     );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Product updated successfully",
//       data: product
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Update failed"
//     });
//   }
// };

// // GET PRODUCTS (CUSTOMER)
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ stock: { $gt: 0 } });

//     res.json({
//       success: true,
//       data: products
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

// // DELETE PRODUCT (ADMIN)
// exports.deleteProduct = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const { id } = req.params;

//     const user = await User.findById(userId);
//     if (!user || user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin access only"
//       });
//     }

//     await Product.findByIdAndDelete(id);

//     res.json({
//       success: true,
//       message: "Product deleted"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;

    const product = new Product({
      name,
      description,
      price,
      stock,
      image
    });

    await product.save();

    res.json({
      success: true,
      message: "Product added",
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Add product failed"
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product updated",
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed"
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};
