const express=require('express');
const app = express();
app.use(express.json());
const messageSender=require('./sendMessage');

app.get('/message/12345', (req, res) => {

    messageSender(req.query.message,req.query.number,req.query.subject);

});

app.listen(3000, () => console.log('SMS Service Listening on PORT 3000'))