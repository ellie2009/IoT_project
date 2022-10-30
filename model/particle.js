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

var checkBinStatus = async function() {
    var isBinFull;
    try{
        const loginToken = await obtainLoginToken();
        const response = await callParticleFunction("checkBin", "check", loginToken);
        isBinFull = await getParticleVariable("binFull", loginToken);
    }
    catch (err) {
        console.log("error checking bin status");
        return -1;
    };
    return isBinFull;
};


module.exports = { checkBinStatus }
