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
        let cart = await Cart.findOne({user: userId});
        if(!cart){
            cart = new Cart({
                user: userId,
                items:[{product: productId, quantity:1}]
            });
            await cart.save();
            return res.status(201).json({message:"Product added to cart", cart});
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

const updateQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return res.status(404).json({ error: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ message: "Quantity updated", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports= { addToCart, getCart, updateQuantity, removeFromCart};

