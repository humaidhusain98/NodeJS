const { totp } =require('otplib');

totp.options = { digits: 8 ,step: 120};
//------------otp generation and validation--------------
const generateOTP= async function generateOTP(mobileNumber)
{
   
  const token =await totp.generate(mobileNumber);
    return token;
}

const validateOTP= async function validateOTP(mobileNumber,token)
{
    const isValid =await totp.check(token, mobileNumber);
    return isValid;
}

//------------otp generation and validation--------------

module.exports={generateOTP,validateOTP};