const mongoose= require('mongoose');
const { required } = require('nodemon/lib/config');

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    createdAt:{
        type: Date,
        dafault: Date.now
    }
});

module.exports= mongoose.model('User',userSchema);