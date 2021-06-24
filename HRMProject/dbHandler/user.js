const mongoose= require("./mongooseConnection");

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: true
    },
    last_name:
    {
    	type:String,
    	required: true,
    },
    email:
    {
        type:String,
        required: true,
       
    },
    mobile:
    {
        type:String,
        required: true,
       
    },
    imageUrl:
    {
    	type:String,
        required: true,
    	
    },
    designation:{
        type:String,
        required: true
    },
    role:
    {
        type:Number,
        required: true // 0 for superAdmin , 1 for Admin , 2 for users
    },
    password: 
    {
        type : String,
        required : true
    },
    dateCreated:
    {
        type : Date,
        required : true
    }
});

const user= mongoose.model('userSchema', userSchema);

module.exports=user;