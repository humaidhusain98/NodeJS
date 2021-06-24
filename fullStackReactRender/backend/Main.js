const express = require('express');
const app = express();
const path = require('path');


app.use('/app1',express.static(path.join(__dirname,'build_app1')));
app.use('/app2',express.static(path.join(__dirname,'build_app2')));
app.get('/app1/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build_app1','index.html'));

})



app.get('/app2/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build_app2','index.html'));

})

app.get('/',(req,res)=>{
    res.json({msg:"Homepage"});

})

app.listen(3000,()=>{
    console.log("App Started on port 3000");
})