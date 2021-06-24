const router=require('express').Router();
const Kitten = require('./mongodbconnection');

router.get('/getall',async(req,res)=>{
    const allobj = await Kitten.find();
    res.json(allobj);
})

router.get('/:id',async(req,res)=>{
    try{
    const id= req.params.id;
    const obj = await Kitten.findById(id);
    res.json(obj);
    }
    catch(e)
    {
        res.json({message:"The id could not be found"});
    }
});

router.post('/add',async(req,res)=>{
    try{
        const name = req.body.name;
        const obj=new Kitten({name:name}); 
        await obj.save();
        res.json(obj);
    }
    catch(e)
    {
        res.json({message:"There has been an error in saving! invalid input maybe"}).status(400);
    }
});

router.delete('/delete/:id',async(req,res)=>{
    try
    {
        const id = req.params.id;
        const obj = await Kitten.findById(id);
         if(obj)
        {
            const result=await obj.remove();
            res.json({result,message:"Object Successfully Deleted"}); 
        }
        else
        {
            res.json({message:"Object Not found"});
        }
       
    }
    catch(e)
    {
        res.json({message:"Error of some kind!! Maybe Object not present"});
    }
})


module.exports=router;