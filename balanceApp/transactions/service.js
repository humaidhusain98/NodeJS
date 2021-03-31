const transactRepo = require('./repo')

async function gettingUser(){
    //service layer
    const resp=await transactRepo.getUsers();
    return resp;
}

module.exports.getUsers=gettingUser;
