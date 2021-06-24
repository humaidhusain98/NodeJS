const { totp } =require('otplib');
const express = require('express')
//
const messageSender = require('./../awsHandler/sendMessage');
//

totp.options = { digits: 6 ,step: 120};
//------------otp generation and validation--------------
async function generateOTP(mobileNumber)
{
   
  const token =await totp.generate(mobileNumber);
    return token;
}

async function validateOTP(mobileNumber,token)
{
    const isValid = totp.check(token, mobileNumber);
    return isValid;
}

//------------otp generation and validation--------------

const app = express();
const port = 3000;

app.get('/generateOTP', async(req, res) => {
  const mobileNumber = req.query.mobileNumber;
  const otp = await generateOTP(mobileNumber);
  const message="Your OTP generated for TalGenie is "+otp+" Valid for 2minutes";
  // messageSender(message,mobileNumber,"otpver");
  res.json({otp});
});

app.get('/verifyOTP',async (req, res) => {
    const mobileNumber = req.query.mobileNumber;
    const otp =req.query.otp;
    console.log(mobileNumber);
    console.log(otp);
    const isValid =await validateOTP(mobileNumber,otp);
    
    res.json({"status":isValid});
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




