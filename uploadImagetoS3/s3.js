require('dotenv').config();
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;



const AWS = require('aws-sdk');


AWS.config.update({region: region});


s3 = new AWS.S3({apiVersion: '2006-03-01'});



//uploads a file to s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    
    return s3.upload(uploadParams).promise();

}


function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream();
}


function deleteS3Object(key){
    const deleteParams = {
        Key: key,
        Bucket : bucketName
    }

    return s3.deleteObject(deleteParams).promise();

}


exports.uploadFile = uploadFile;

exports.getFileStream = getFileStream;

exports.deleteS3Object = deleteS3Object;

//downloads a file from s3