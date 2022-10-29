var express = require('express')
var app = express()

var particleRouter = require("./routes/particle");
var binRouter = require("./routes/bins");


app.use("/particle", particleRouter);
app.use("/bins", binRouter);


 
app.get('/', function (req, res) {
   res.send('Basic Express.js app');
})
 
var server = app.listen(8000)