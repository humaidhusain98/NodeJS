const tokenmodel=require('./../dbHandler/refreshTokens');

// const user1=new usermodel({mobile:"8420617036",first_name:"Md Humaid",last_name:"Husain"});




async function test()
{
    const tokens= await tokenmodel.exists({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiOTc0ODQxNDExNyIsImlhdCI6MTYxODIwMTk4NH0.cNNdZFQFSKy4lHsqz2CS9A0jthcxHdvfASgBmvvZ07g"});
    console.log(tokens);
}


test();