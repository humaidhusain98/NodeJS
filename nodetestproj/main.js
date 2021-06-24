const express = require('express');
const app=express();

//db Connection
require('./db/mongodbconnection');

//Router
const router=require('./db/headerRouter');

//middleware
app.use(express.json());

const port =3000;

app.use('/kitten',router);

app.get('/test',(req,res)=>{
    const obj = {id:1,name:"Object Name",title:"Object title"};
    res.json(obj);
})

app.listen(port,()=>{

    console.log(`App listening on port ${port}`);
})