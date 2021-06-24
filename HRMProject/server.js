const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

//controllers

const userController = require('./controller/userController');
const testController = require('./controller/testController');
const authController = require('./authentication/loginRoute');

//middlewares
app.use(cookieParser());
app.use(cors({origin:'http://localhost:4200',credentials:true}));
app.use(express.json());

app.use("/user",userController);
app.use("/test",testController);
app.use("/auth",authController);
app.get('/',(req,res)=>{
    console.log(req);
    res.json({msg:"Success"});
})


app.listen(4000,()=>{
    console.log("Server running on port 4000");
})