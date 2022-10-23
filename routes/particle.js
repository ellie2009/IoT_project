var express = require("express");
var router = express.Router();
require("dotenv").config();

var Particle = require('particle-api-js');
var particle = new Particle();


const email = process.env.PARTICLE_EMAIL;
const password = process.env.PARTICLE_PASSWORD;
const device_id = process.env.PARTICLE_DEVICE_ID;


var obtainLoginToken = async function(){ 
  var token = await particle.login({username: email, password: password}).then(
    function(data) {
      return data.body.access_token;
    },
    function (err) {
      throw new Error("Login error");
    }
  );

  return token;
};


var callParticleFunction = async function(deviceFunction, functionArgument, loginToken) {
  var data = await particle.callFunction({ deviceId: device_id, name: deviceFunction, argument: functionArgument, auth: loginToken });

  if(data.body.return_value == -1) {
    throw new Error("Wrong argument for Particle function");
  }

  return data.body.return_value; 
};


var getParticleVariable = async function(variableName, loginToken) {
  var data = await particle.getVariable({ deviceId: device_id, name: variableName, auth: loginToken });
  
  return data.body.result;
};


router.get("/checkBinStatus", async function(req, res) {
  try{
    const loginToken = await obtainLoginToken();
    const response = await callParticleFunction("checkBin", "check", loginToken);
    const isBinFull = await getParticleVariable("binFull", loginToken);
   
    res.send("Successfully checked bin status. Bin is full: " + isBinFull);
  }
  catch (err) {
    console.log(err)

    res.send("Something went wrong");
  }
});


/*
router.get("/", async function(req, res, next) {
  const loginToken = await obtainLoginToken();
  if(loginToken != "error"){
    res.send('Token creation worked. Token is: ' + loginToken);
  } else {
    res.send("An error occurred.");
  }
});
*/


module.exports = router;
