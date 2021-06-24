const userModel = require("../dbHandler/user");


const getUserByUsername = async(username)=>{
    try
    {
        const userObj =  await userModel.findOne({email:username});
        return userObj;
    }
    catch(e)
    {
        console.log(e);
        return null;
    }

}

module.exports = {getUserByUsername};