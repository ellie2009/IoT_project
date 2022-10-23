var express = require("express");
var router = express.Router();
require("dotenv").config();

var Particle = require('particle-api-js');
var particle = new Particle();
var token;

const email = process.env.PARTICLE_EMAIL;
const password = process.env.PARTICLE_PASSWORD;

router.get("/", function(req, res, next) {
    particle.login({username: email, password: password}).then(
        function(data) {
          token = data.body.access_token;
          console.log(token)
        },
        function (err) {
          console.log('Could not log in.', err);
        }
      );
  });

  module.exports = router;
