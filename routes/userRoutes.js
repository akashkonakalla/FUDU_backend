const express=require('express');
const router=express.Router();
const {userRegister,userLogin, getUserProfile, updateUserProfile}= require('../controllers/userController');
const userAuth= require('../middlewares/userAuth')

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/profile', userAuth, getUserProfile);
router.put('/profile', userAuth, updateUserProfile);

module.exports= router;