const Client = require('pg').Client;
const client = new Client({
    user:"",
    password:"",
    host: "",
    port: ,
    database: ""

})

client.connect()
.then(()=>console.log("Connected successfully"))
.then(()=> client.query("SELECT * FROM jobs"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(()=> client.end())
