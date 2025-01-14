const admin=require('../models/admin');
const user=require('../models/user')
const bcrypt=require('bcryptjs');

const rootAdmin=async(req,res)=>{
    try {
        res.redirect('/admin/login');
        
    } catch (error) {
        console.log(error.message);
        
    }
}
const loginAdmin=async(req,res)=>{
    try {
        res.render('admin/login');
    } catch (error) {
        console.log(error.message);    
    } 
}

const securePassword=async(password)=>{
    try{
      const passwordHash=await bcrypt.hash(password,10);

      return passwordHash;

    }catch(error){

      console.log(error.message);
    }
  }
const getRegister=async(req,res)=>{
    try {
        res.render('admin/register');
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const inputRegister=async(req,res)=>{
    try {
        
        const password=await securePassword(req.body.password);
        const adminData= new admin({name:req.body.name,
        department:req.body.department,
        email:req.body.email,
        mobile:req.body.mobile,
        password:password})
       const savedAdmindata= await adminData.save();
       if(savedAdmindata){
        res.render('admin/register',{message:'Registered successfully'});
       }else{
        res.render('admin/register',{message:'Registeration Unsuccessful'});
       }
        
    } catch (error) {
        console.log(error.message);
        
    }
}
const verifyAdminlogin=async(req,res)=>{
    try{
        const name=req.body.username;
        const password=req.body.password;
        const adminData=await admin.findOne({name:name});
        if(adminData){
            const pwdMatch=await bcrypt.compare(password,adminData.password);
            if(pwdMatch){
                req.session.admin_id=adminData._id;
                req.session.admin=adminData;
                res.redirect('/admin/home');
            }else{
                res.redirect('/admin/login',{message:"name or password is incorrect"});
            }
            
        }else{
            res.redirect('/admin/login',{message:"name or password is incorrect"});

        }

    }catch(error){
        console.log(error.message);
    }
}
const loadHome=async(req,res)=>{
    try {
        res.render('admin/home',{admin:req.session.admin});
        
    } catch (error) {

    
      console.log(error.message);
        
    }
}

const dashboardData=async(req,res)=>{
    try {
        const userData=await user.find();

     res.render('admin/dashboard',{admin:req.session.admin,user:userData});      
    } catch (error) {

        console.log(error.message);  
    }
}

const dashboardSearchdata=async (req, res) => {
    try {
        let query = req.body.query;
        if (query) {
            const use = await user.findOne({ name: query });
           
            res.render('admin/searchUser', {users:use});
        } 
    } catch (error) {

        console.log(error.message);
        res.redirect('/admin/dashboard'); 
    }
};

const create=async(req,res)=>{
    try {
        res.render('admin/createUser');
    } catch (error) {
        console.log(error.message);   
    }
}
const createUser=async(req,res)=>{
    try {
        const secPassword=await securePassword(req.body.password);
        const userData= new user({name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:secPassword,
        is_admin:0
    });
       const sUserdata= await userData.save();
       if(sUserdata){
        res.redirect('/admin/dashboard');
       }else{
        res.redirect('/admin/createUser');
       }     
    } catch (error) {
    console.log(error.message);  
    }
}

const editUser=async(req,res)=>{
    try{ 
        const id=req.query.id;
        const userData=await user.findById({_id:id});
        if(userData){
            res.render('admin/editUser',{user:userData});
        }else{
            res.redirect('/admin/dashboard');
        }
    } catch (error) {
        console.log(error.message);
    }
}
const updateUser=async(req,res)=>{
    try {
      const userData=await  user.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,mobile:req.body.mobile,email:req.body.email}})
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error.message);
        
    }
}

const deleteUser=async(req,res)=>{
    try{
        const id=req.query.id;
        await user.deleteOne({_id:id});
        res.redirect('/admin/dashboard');

    }catch(error){
    console.log(error.message);
    }
}
const adminLogout=async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin/login');
    } catch (error) {

        console.log(error.message);  
    }
}
module.exports={
    rootAdmin,
    loginAdmin,
    verifyAdminlogin,
    getRegister,
    inputRegister,
    loadHome,
    dashboardData,
    dashboardSearchdata,
    create,
    createUser,
    editUser,
    updateUser,
    deleteUser,
    adminLogout
}