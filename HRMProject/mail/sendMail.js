require('dotenv').config();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-south-1'});

// Create sendEmail params 
var params = {
  Destination: { /* required */
    ToAddresses: [
      'humaidhusain98@gmail.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "<html><h1>Credentials</h1><br/><p>Email:<strong>humaidhusain@iem.com</strong></p><p>Password:<strong>129cfvg</strong></p></html"
      },
      Text: {
       Charset: "UTF-8",
       Data: "Your credentials are given below! \nemail:humaidhusain@iem.com\nPassword:129cfvg\nPlease log in and reset your password"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Email for Verification of account on HRM Management Tool'
     }
    },
  Source: 'humaidhusain98@gmail.com', /* required */
  ReplyToAddresses: [
     'humaidhusain98@gmail.com',
    /* more items */
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });