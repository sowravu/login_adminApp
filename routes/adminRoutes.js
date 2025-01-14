const express=require("express");
const adminRoute=express();
const session=require("express-session");
const adminController=require('../controllers/adminController');
const path=require("path");
const adminAuth=require("../middlewares/adminAuth")

const bodyParser=require('body-parser');
adminRoute.use(bodyParser.json());
adminRoute.use(session({secret:"secret",resave:false,saveUninitialized:false}));
adminRoute.use(bodyParser.urlencoded({extended:true}));
adminRoute.use(express.static(path.join(__dirname,'public')));

adminRoute.get('/',adminAuth.isLogout,adminController.rootAdmin);
adminRoute.get('/login',adminAuth.isLogout,adminController.loginAdmin);
adminRoute.post('/login',adminController.verifyAdminlogin);
adminRoute.get('/register',adminAuth.isLogout,adminController.getRegister);
adminRoute.post('/register',adminController.inputRegister);
adminRoute.get('/home',adminAuth.isLogin,adminController.loadHome);
adminRoute.get('/dashboard',adminAuth.isLogin,adminController.dashboardData);
adminRoute.get('/create',adminAuth.isLogin,adminController.create);
adminRoute.post('/create',adminController.createUser);
adminRoute.get('/edit',adminAuth.isLogin,adminController.editUser);
adminRoute.post('/edit',adminController.updateUser);
adminRoute.get('/delete',adminController.deleteUser);
adminRoute.post('/search', adminController.dashboardSearchdata);
adminRoute.get('/logout',adminController.adminLogout);

module.exports=adminRoute;