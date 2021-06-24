require('dotenv').config();

var AWS = require('aws-sdk');


const messageSender= function sendMessage(message,number,subject){

    console.log("Message = " + message);
    console.log("Number = " + number);
    console.log("Subject = " + subject);
    var params = {
        Message: message,
        PhoneNumber: '+91' + number,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': subject
            }
        }
    };

    var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    publishTextPromise.then(
        function (data) {
            console.log(data.MessageId);
        }).catch(
            function (err) {
               console.log(err);
            });

};

module.exports=messageSender;
