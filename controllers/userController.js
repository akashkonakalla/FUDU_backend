const User= require('../models/User');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const dotEnv= require('dotenv');

dotEnv.config();
const secretKey= process.env.JWT_SECRET;

const userRegister= async(req,res)=>{
try {
    const {name, email, password}= req.body;
    const existingUser= await User.findOne({email});
    if(existingUser)
    {
        return res.status(400).json({error: "email already registered"});
    }

    const hashedPassword= await bcrypt.hash(password, 10);
    const newUser= new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({message:"User registered successfully"});


} catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});    
 }
};

const userLogin = async(req,res)=>{
    try {
        const {email, password}= req.body;
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status(400).json({error: "Invalid email or password"});
        }
        const token =jwt.sign({userId: user._id}, secretKey, {expiresIn: "1h"});
        res.status(200).json({message:"Login Successful", token})
        console.log({email}, {token});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
};

const getUserProfile = async(req,res)=>{
    try{
        const user= await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({profile: user});
        // console.log({user})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}


const updateUserProfile = async(req,res)=>{
    try {
        const {name, phone, address }=req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            {name,phone,address},
            {new: true}
        ).select('-password');
        res.status(200).json({message:"Profile updated successfully", profile: updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
};


module.exports = {userRegister,userLogin, getUserProfile, updateUserProfile};

    