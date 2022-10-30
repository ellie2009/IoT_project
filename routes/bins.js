var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/db_helper");
const populateDatabase = require("../model/database");
const particle = require("../model/particle");

router.use(bodyParser.json());

router.get('/checkBinStatus', async function(req,res) {
    try{
        // Query the particle device for correct isFull status. Returns true/false and not 0/1!
        const isSmartBinFull = await particle.checkBinStatus();
        const newDbValue = isSmartBinFull == false ? 0 : 1;
        // Update the database with the response obtained from the particle device.
        const updateSmartBinDbEntry = await db(`UPDATE bins SET isFull="${newDbValue}" WHERE id="1";`);
        // Query the database for the status of all bins.
        const response = await db(`SELECT * FROM bins;`);
        res.send(response.data);
    } catch(err){
        res.send(err);
    }
});

router.put('/emptyBin/:id', async function(req, res) {
    try{
        const { id } = req.params;
        const isFull = req.body.isFull;
        const respose = await db(`UPDATE bins SET isFull="${isFull}" WHERE id="${id}";`);
        res.send(respose.data);
    }catch(err){
        res.send(err);
    }
});

router.post('/populateDatabase', async function(req, res) {
    const response = await populateDatabase();
    res.send(response);
});

module.exports = router;

