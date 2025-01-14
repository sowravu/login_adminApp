const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');
const adminModel=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

})

module.exports=mongoose.model('admin',adminModel);