const fs =require('fs');

//readStream
const readStream =  fs.createReadStream('./docs/output.txt',{encoding:'utf8'});

//write stream

const writeStream = fs.createWriteStream('./docs/blog2.txt');


// readStream.on('data',(chunk)=>{

//     console.log('------------------------------NEW CHUNK------------------------');
//     console.log(chunk);
//     writeStream.write('\n NEW CHUNK\n');
//     writeStream.write(chunk);
// })

//piping

readStream.pipe(writeStream);