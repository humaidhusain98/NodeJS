const express = require('express');
const cors = require('cors');
const app =express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

const { uploadFile ,getFileStream,deleteS3Object} = require('./s3');

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000']
  }))

app.get('/images/:key',(req,res)=>{
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
})


app.post('/images',upload.single('image'),async(req,res)=>{
    const file = req.file;
    const description = req.body.description;
    console.log(file);
    const result= await uploadFile(file);
    await unlinkFile(file.path);
    console.log(result);
    res.send({imagePath:`images/${result.key}`});
})


app.get('/image-delete/:key',async(req,res)=>{
  const key = req.params.key;
  const result =  await deleteS3Object(key)
  res.json(result);   

})


app.listen(4000,()=>{console.log("Server started on port 4000")});