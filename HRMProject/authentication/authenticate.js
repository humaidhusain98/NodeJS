const jwt=require('jsonwebtoken');

const checkValid = async(req,res,next)=>{
    const token = req.cookies.jwt;
    console.log(token);
    if(!token) res.status(404).json({msg:"Token Not Found"});
    else
    {
        try
        {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(403).json({msg:"Error inside verifing jwt"});
                else
                {
                    req.user = user;
                    console.log(user);
                    next();
                }
            })
        }
        catch(e)
        {   
            res.status(403).json({msg:"unAuthorized"});
        }
       
     
    }
   


}

const checkSuperAdmin=async(req,res,next)=>{
    const {token} = req.body;
    if(!token) res.status(404).json({msg:"Token Not Found"});
    else
    {
        try
        {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(403).json({msg:"Error inside verifing jwt"});
                else
                {
                    if(user.role==0)
                    {
                        req.user=user;
                        next();
                    }
                    else
                    {
                        res.status(403).json({msg:"No Admin/user allowed"});
                    }
                   
                }
            })
        }
        catch(e)
        {   
            console.log(e);
            res.status(403).json({msg:"unAuthorized"});
        }
       
     
    }

}

const checkAdmin=async(req,res,next)=>{
    const {token} = req.body;
    if(!token) res.status(404).json({msg:"Token Not Found"});
    else
    {
        try
        {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(403).json({msg:"Error inside verifing jwt"});
                else
                {
                    if(user.role==0 || user.role ==1)
                    {
                        req.user=user;
                        next();
                    }
                    else
                    {
                        res.status(403).json({msg:"No User allowed"});
                    }
                }
          
            })
        }
        catch(e)
        {   
            res.status(403).json({msg:"unAuthorized"});
        }
       
     
    }

}

module.exports={checkValid,checkSuperAdmin,checkAdmin};

