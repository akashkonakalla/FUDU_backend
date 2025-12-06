const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");

const {  addToCart, getCart,  updateQuantity,  removeFromCart} = require("../controllers/cartController");

router.post("/add", userAuth, addToCart);
router.get("/", userAuth, getCart);
router.put("/update", userAuth, updateQuantity);
router.delete("/remove", userAuth, removeFromCart);

module.exports = router;
