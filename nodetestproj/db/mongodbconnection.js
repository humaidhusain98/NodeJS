//mongoose---

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection successfull!");
});

const kittySchema = new mongoose.Schema({
    name:{ 
      type: String,
    required: true
    }
    
  });

kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }

const Kitten = mongoose.model('Kitten', kittySchema);

module.exports=Kitten;


