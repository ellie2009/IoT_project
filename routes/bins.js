var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/db_helper");

router.use(bodyParser.json());


router.get('/checkBinStatus', async function(req,res) {
    try{
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

module.exports = router;

