var express = require("express");
var router = express.Router();
require("dotenv").config();

var Particle = require('particle-api-js');
var particle = new Particle();
var token;

const email = process.env.PARTICLE_EMAIL;
const password = process.env.PARTICLE_PASSWORD;

var obtainLoginToken = async function(req, res){ 
  var token = await particle.login({username: email, password: password}).then(
    function(data) {
      return data.body.access_token;
    },
    function (err) {
      //console.log('Could not log in.', err);
      return "error";
    }
  );

  return token;
};

router.get("/", async function(req, res, next) {
  const loginToken = await obtainLoginToken();
  if(loginToken != "error"){
    res.send('Token creation worked. Token is: ' + loginToken);
  } else {
    res.send("An error occurred.");
  }
});

module.exports = router;
