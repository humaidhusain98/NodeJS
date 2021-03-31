const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb",{ useNewUrlParser: true },(error)=>{
if(!error)
{
    console.log("Success");
}
else
{
    console.log("Error");
}

})

const Course = require('./course.model');
