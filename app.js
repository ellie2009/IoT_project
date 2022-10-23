var express = require('express')
var app = express()

var particleRouter = require("./routes/particle");

app.use("/particle", particleRouter);

 
app.get('/', function (req, res) {
   res.send('Basic Express.js app');
})
 
var server = app.listen(8000)