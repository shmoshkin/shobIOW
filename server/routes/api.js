const express = require('express');
const DB = require('../DBAccess');
const router = express.Router();

// import RH
const cleaningDutyRH = require('../CleaningDuty/CleaningDutyRH');
const commonCrudRH = require('../CommonCrud/CommonCrudRH');

// now we can set the route path & initialize the API
router.get('/', function(req, res) {
   res.send("api works");
});

var db = new DB();

router.route('/getAll').get(function(req, res) {
    commonCrudRH.getAll(req.query.collection, (result) => {
        res.send(result);
    });
})

router.route('/saveModel').post(function(req, res) {
    commonCrudRH.save(req.body.collection, req.body.model, () => {
        res.send({});
    });
})

router.route('/deleteMembers').post(function(req, res) {
    db.deleteByIds("ShoblaMembers", req.body.ids, res);
})

router.route('/cleaners').get(function(req, res) {
    
    cleaningDutyRH.getCleaners((result) => {
        res.send(result);
    });
})

router.route('/addMember').post(function(req, res) {
    db.insert("ShoblaMembers", req.body.member, res);
})

router.route('/saveMember').post(function(req, res) {
    db.save("ShoblaMembers", req.body.member);
})

module.exports = router;