const express= require('express');
const app = express();
const PORT =3000;
const parser = require("body-parser");

app.use(parser.json());

const userSchema = require('./userObjSchema');
const mongoose = require(mongoose);

app.get("/",(req,res)=>{
    message="hello World";
    res.json({message});
})

app.listen(PORT,()=>{
    console.log(`App started on port ${PORT}`);
})
