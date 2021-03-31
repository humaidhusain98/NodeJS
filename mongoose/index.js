const connection = require('./model');
const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/courses')
const app = express()
const port = 3000
app.use(bodyParser.json())


app.use('/',controller)

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })