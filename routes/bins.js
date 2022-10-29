var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/db_helper");

router.use(bodyParser.json());


router.get('/', async function(req,res) {
    console.log("here");

    try{
        const respose = await db(`SELECT * FROM bins;`);
        res.send(respose);
    } catch(err){
        res.send(err);
    }

});

module.exports = router;

