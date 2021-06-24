const mongoose= require("./mongooseConnection");

const userSchema = new mongoose.Schema({
    mobile:{
        type: String,
        required: true
    },

    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    }

});

const User= mongoose.model('User', userSchema);

module.exports=User;