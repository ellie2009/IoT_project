var express = require('express')
var app = express()

var binRouter = require("./routes/bins");

app.use("/bins", binRouter);


 
app.get('/', function (req, res) {
   res.send('Basic Express.js app');
})
 
var server = app.listen(5000)