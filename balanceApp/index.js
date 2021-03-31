const express = require('express')
const bodyParser = require('body-parser')
var transactController = require('./transactions/controller')
const transact = require('./transactions/model')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/transactions', transactController)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)

  })
