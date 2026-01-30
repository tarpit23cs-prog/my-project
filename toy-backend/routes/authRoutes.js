const express = require("express");
console.log("AUTH ROUTES LOADED");
const { signup, login } = require("../controllers/authController");
const { updateProfile } = require("../controllers/authController");

const router = express.Router();




router.post("/signup", signup);
router.post("/login", login);
router.put("/update-profile", updateProfile);
router.get("/test", (req, res) => {
  res.send("Auth test working");
});

module.exports = router;
