const express = require('express');
const fs = require('fs');
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get('/video',(req,res)=>{
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Requires Range header");
    }
    const videoPath = "bigbuck.mp4";
    const videoSize = fs.statSync("bigbuck.mp4").size;

    //Parse Range
    //Example : "bytes=32324-"
    const CHUNK_SIZE = 10**6;// 1mb
    const start = Number(range.replace(/\D/g,""));
    const end = Math.min(start + CHUNK_SIZE,videoSize-1);

    const contentLength = end-start + 1;
    const headers = {
        "Content-Range":`bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":"bytes",
        "Content-Length": contentLength,
        "Content-Type":"video/mp4"
    }

    res.writeHead(206,headers);

    const videoStream = fs.createReadStream(videoPath,{start,end});

    videoStream.pipe(res);

})

app.listen(4000,()=>{
    console.log("Listening on port 4000");
})