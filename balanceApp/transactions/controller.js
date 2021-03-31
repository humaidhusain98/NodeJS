var express = require('express')
var router = express.Router()
var Transact = require('./model')
var service = require('./service')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', async function (req, res) {
  console.log(req.headers)
  var response = await service.getUsers();
  res.json(response);
  
})
// // define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })



module.exports = router