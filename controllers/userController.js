const User = require('../models/user');
const bcrypt=require('bcryptjs');



const securePassword=async(password)=>{
  try{

    const passwordHash=await bcrypt.hash(password,10);
    return passwordHash;

  }catch(error){
    console.log(error.message);
  }
}


// Register a new user
const loadRegister= async (req, res) => {
 try{
  res.render('users/register');

 }catch(error){
  console.log(error.message);
 }}




const insertUser=async(req,res)=>{
  try{

    const spassword=await securePassword(req.body.password);
    const user=new User({
      name:req.body.username,
      mobile:req.body.mobile,
      email:req.body.email,
      password:spassword,
      is_admin:0,
    });
    const userData=await user.save();
    if(userData){
      res.render('users/register',{message:"your registration has been succesfull."});
    }
    else{
      res.render('users/register',{message:"your registation has been failed"});
    }

  }catch(error){
    console.log(error.message);
  }
}
//login user methods 
const loginLoad=async(req,res)=>{
  try{
    res.render('users/login');
  }catch(error){
    console.log(error.message);
  }
}

const verifyLogin=async(req,res)=>{
  try{
    const name=req.body.name;
    const password=req.body.password;
 
    const userData=await User.findOne({name:name});
    if(userData){ 
      const passwordMatch=await bcrypt.compare(password,userData.password)
      if(passwordMatch){
        req.session.user_id=userData._id;
        req.session.user=userData;
      
      res.redirect('/home');
        
      }else{
         res.render('users/login',{message:"name or password is incorrect"});
      }

    }else{
      res.render('users/login',{message:"name or password incorrect"})
    }


  }catch(error){
    console.log(error.message);
  }
}

const loadHome=async(req,res)=>{
  try{

    res.render('users/home',{user:req.session.user});

  }catch(error){
    console.log(error.message);

  }

  }

const userLogout=async(req,res)=>{
  try{
    req.session.destroy();
    res.redirect('/');

  }catch(error){
    console.log(error.messsage);
  }

}


module.exports = {
  loadRegister,
  insertUser,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout
}