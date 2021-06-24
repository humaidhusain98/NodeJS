require("dotenv").config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const {getUserByUsername} = require('./dbfunc');
const jwt=require('jsonwebtoken');
const {checkValid} = require('../authentication/authenticate');


router.post("/login",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) res.status(404).json({msg:"password or username missing"});
    else{

        const user = await getUserByUsername(username);
        if(!user) res.status(404).json({msg:"User not found"});
        else
        {
            try
            {
                bcrypt.compare(password, user.password,async(err,result)=>{
                    if(err)
                        res.status(403).json({msg:"Error occured while comparing"});
                    else    
                        {
                            if(result===false) res.status(403).json({msg:"Incorrect Username or password"});
                            else
                            {
                                const jwtUser = {_id:user._id , role:user.role};
                                const accessToken = await jwt.sign(jwtUser,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '8640000s'});//8640000
                                res.cookie('jwt',accessToken,{
                                    sameSite:'strict',
                                    path:'/',
                                    expires:new Date(new Date().getTime()+8640000*1000),
                                    httpOnly:true 
                                }).json({msg:"Token Successfully Generated after Authentication",token:accessToken});
                            }
                        }
                });
            }
            catch(e)
            {
                res.status(403).json({msg:"Error occured in try block"});
            }

          
        }
        
    }
   
});


router.post("/logout",checkValid,async(req,res)=>{
    console.log(req.cookies);
    res.clearCookie('jwt').json({success:true});
});


router.post("/checkAuthenticated",checkValid,(req,res)=>{
        res.json({msg:"Valid"});

})



module.exports = router;