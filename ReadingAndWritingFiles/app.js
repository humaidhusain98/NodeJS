var fs = require('fs');
//Synchronous Version
//var readMe= fs.readFileSync('readMe.txt','utf8');
//console.log(readMe);
//fs.writeFileSync('writeMe.txt',readMe);

//Asynchronous Version
fs.readFile('readMe.txt','utf8',function(err,data){
    fs.writeFile('writeMe.txt',data,(err)=>{});
});
console.log('test');