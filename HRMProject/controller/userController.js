const userModel = require("../dbHandler/user");
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {checkValid,checkSuperAdmin,checkAdmin} = require('../authentication/authenticate');

//Basic Crud Operations
router.post("/add",async(req,res)=>{

    const {first_name,last_name,email,password,role} = req.body;

    if(first_name && last_name && email && password )
    {

        try
        {
            
            //Encrypt Password Before Saving
            let hashedPassword = await bcrypt.hash(password,10);
            const userObj = await new userModel({first_name: first_name,last_name:last_name,password : hashedPassword ,email : email,dateCreated: new Date(),role:role});
            const resp = await userObj.save();
            console.log(resp);

            res.json({msg:"User Object Saved Successfully"});
    
        }
        catch(e)
        {
            res.status(500).json({err:"Problem in saving User ! Server Down Maybe"});
        }


    }
    else
    {
        res.status(406).json({err:"Please Enter All Details"});
    }

  

});


router.get("/get",checkValid,async(req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;

    const results = {}

    if(endIndex < await userModel.countDocuments().exec())
    {
       results.next = {
           page: page+1,
           limit: limit
       }
    }
 

    if(startIndex >0)
    {
       results.previous = {
           page: page-1,
           limit: limit
       }
    }
    
    
    try
    {
        results.results = await userModel.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results;
        console.log(results.results);
        res.json(res.paginatedResults);
    }
    catch(e)
    {
        res.status(500).json({ message : e.message})
    }
    

  
})


router.post("/delete",async(req,res)=>{
    const id = req.body.id;
    try
    {
        const userObj =  await userModel.findById(id);
        const resp = await userObj.delete();
        res.json(resp);
    }
    catch(e)
    {
        res.status(500).json({err:e.message});
    }
 
});


router.post("/edit",async(req,res)=>{

    const id = req.body.id;
    const user = req.body.user;
    try
    {
        const userObj =  await userModel.findById(id);
        if(userObj)
        {
            userObj.first_name=user.first_name;
            userObj.last_name = user.last_name;
            userObj.email = user.email;
            userObj.role = user.role;
            const resp = await userObj.save();
            res.json(resp); 
        }
        res.status(400).json({err:"Id does not exist"});
    }
    catch(e)
    {
        res.status(500).json({err:e.message});
    }
   
    

});




function paginatedResults(model)
{
    return async (req,res,next) =>{

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        
        const startIndex = (page-1)*limit;
        const endIndex = page*limit;
   
        const results = {}
   
        if(endIndex < await model.countDocuments().exec())
        {
           results.next = {
               page: page+1,
               limit: limit
           }
        }
     
   
        if(startIndex >0)
        {
           results.previous = {
               page: page-1,
               limit: limit
           }
        }
        
        
        try
        {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results;
            next()
        }
        catch(e)
        {
            res.status(500).json({ message : e.message})
        }
   
     

    }
}

//Basic Crud Operations





module.exports=router;