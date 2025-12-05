const express=require('express');
const router=express.Router();
const {userRegister,userLogin}= require('../controllers/userController');
const userAuth= require('../middlewares/userAuth')

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/profile', userAuth, (req, res)=>{
    res.json({message:"This is a protected profile route", user: req.user});
});

module.exports= router;