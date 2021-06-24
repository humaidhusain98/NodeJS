const mongoose= require("./mongooseConnection");

const refreshSchema = new mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    token:
    {
        type:String,
        required: true
    }
});

const refresh= mongoose.model('refreshtoken', refreshSchema);

module.exports=refresh;
