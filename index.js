const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/userManagement");
const express = require('express');
const path=require("path");
const nocache=require("nocache");
const bodyParser = require('body-parser');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

 // Middleware
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(nocache());

const userRoutes=require('./routes/userRoutes');
app.use('/',userRoutes);

const adminRoute=require('./routes/adminRoutes');
app.use('/admin',adminRoute);

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
