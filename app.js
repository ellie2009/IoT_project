var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
   res.send('Basic Express.js app')
})
 
var server = app.listen(8000)