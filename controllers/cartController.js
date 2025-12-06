const Cart = require('../models/Cart');
const Product= require('../models/Product');

const addToCart = async (req, res) => {

    try {
        const userId= req.userId;
        const {productId} = req.body;

        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({error:"Product no found"})
        }
        let cart = await Cart.findOne({user: userID});
        if(!cart){
            cart = new Cart({
                user: userId,
                items:[{product: productId, quantity:1}]
            });
            await cart.save();
            return res.status(201).json({message:"Product added to cart"}, {cart});
        }
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
       if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });

    } catch (error) {
      console.error(error);
    res.status(500).json({ error: "Internal server error" });   
    }
}

const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json({ items: cart.items });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

