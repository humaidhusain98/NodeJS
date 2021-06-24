//Express
const express = require('express');
const app = new express();
app.use(express.json());

//Assigning Routes
const usdtRoute = require('./routes/usdtRoute');
const leadRoute = require('./routes/leadRoute');
const contractRoute = require('./routes/contractRoute');

app.use('/usdt',usdtRoute);
app.use('/lead',leadRoute);
app.use('/contract',contractRoute);

app.get('/',(req,res)=>{

    res.json({msg:"Success"});

});


app.listen(4000,()=>{
    console.log("Server Started on port 4000");
})

//Express App Setup Basic