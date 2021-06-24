require('dotenv').config();
const express = require('express');
const app = express();
const {generateOTP,validateOTP}=require('./../otpValidator/generateAndValidate');
const jwt = require('jsonwebtoken');

const userModel=require('./../dbHandler/userModel');
const tokenModel=require('./../dbHandler/refreshTokens');

app.use(express.json());



function authenticateToken(req,res,next)
{
    const authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token ==  null)
        return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}

app.get('/posts',authenticateToken,async(req,res)=>{
    try
    {
        const allusers=await userModel.find();
        const getUser=await allusers.filter(obj=>obj.mobile==req.user.name);
        res.json(getUser);
    }
    catch(e)
    {
        res.json({message:"The user could not be found"});
    }
 

})

app.get('/register',async(req,res)=>{
    try
    {
        const first_name= req.query.first_name;
        const last_name= req.query.last_name;
        const mobileNumber=req.query.mobileNumber;
        const userobj=new userModel({first_name:first_name,last_name:last_name,mobile:mobileNumber});
        userobj.save();
        const otp = await generateOTP(mobileNumber);
        console.log(otp);
        const message="Your OTP generated for TalGenie is "+otp+" Valid for 2minutes";
        // messageSender(message,mobileNumber,"otpver");
        res.json({message:"User Successfully stored in db"});

    }
    catch(e)
    {
        res.json({message:"There has been an error in Registering!"})
    }
})


app.get('/generateOTP', async(req, res) => {

    try
    {
        const mobileNumber = req.query.mobileNumber;
        console.log(mobileNumber);
        const userObj = await userModel.findOne({mobile:mobileNumber});
        console.log(userObj);
        if(!userObj) return res.json({message:"User not Found"});
        const otp = await generateOTP(mobileNumber);
        console.log(otp);
        const message="Your OTP generated for TalGenie is "+otp+" Valid for 2minutes";
        // messageSender(message,mobileNumber,"otpver");
        res.status(200).json({message:"OTP sent successfully!"});
    }
    catch(e)
    {
        console.log(e);
        res.json({message:"There has been an error!!"});
    }
  

  });
  


app.get('/login',async(req,res)=>{
    const mobileNumber = req.query.mobileNumber;
    const otp =req.query.otp;
    console.log(mobileNumber);
    console.log(otp);
    const isValid =await validateOTP(mobileNumber,otp);
    console.log(isValid);
     //authenticate user
    if(isValid)
    {
        const user = { name: mobileNumber };
    
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '120s'});
        const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
        try
        {
            const tokensave=await new tokenModel({userid:mobileNumber,token:refreshToken});
            await tokensave.save();
            res.json({accessToken,refreshToken});
        }
        catch(e)
        {
            res.json({message:"Error in Saving Refresh Token in db"});
        }
        

    }
    else
    {
        res.status(404).json({message:"Authentication Unsuccessful"});
    }
   
});

app.post('/token',(req,res)=>{
    const refreshToken = req.body.token;
    
    if( refreshToken == null) return res.sendStatus(401);
    if(!tokenModel.exists({token:refreshToken})) return res.sendStatus(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = jwt.sign({name:user.name},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '120s'});
        res.json({accessToken: accessToken});
    })

    
});

app.delete('/logout',async(req,res)=>{
    try
    {
    const refToken=req.body.token;
    if(refToken==null) res.sendStatus(401);
    
        const tokenObj=await tokenModel.findOne({token:refToken});
        console.log(tokenObj);
        if(tokenObj)
        {
           await tokenObj.deleteOne();
           res.json({message:"Refresh Token Successfully deleted"}).sendStatus(204);
        }
        res.json({message:"Refresh Token is not valid"}).status(422);
    }
    catch(e)
    {
        res.status(403).json({message:e});
    }
   
   
});


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS3lsZSIsImlhdCI6MTYxNjEyODE2MH0.DykChGRVxEz2zeHZNgrabf1ZKk2ixyPuqguXYaajuHU
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});  