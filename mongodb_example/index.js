const {MongoClient} = require('mongodb');
/**
* Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
* See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
*/
const uri = "mongodb+srv://localhost/mydb:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";