const jwt = require('jsonwebtoken');
const dotEnv =require('dotenv');
const User = require('../models/User');

dotEnv.config();

const secretKey= process.env.JWT_SECRET;

const userAuth = async (req, res, next)=>{
    try {
        
        const token = req.headers.Authorization?.split(" ")[1];
        if(!token)
            {
                return res.status(401).json({error: "Token is required"})
            }
            const decoded = jwt.verify(token, secretKey);
            const user = await findById(decoded.userId);
            if(!user)
            {
                return res.status(400).json({error: "User not found"});
            }

            req.userId = decoded.userId;
            next();
            } catch (error) {
                console.error(error);
                return res.status(500).json({error: "Invalid token"});
    }    
}

module.exports = userAuth;
