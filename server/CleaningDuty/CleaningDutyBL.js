'use strict';

const DB = require('../DBAccess');
var db = new DB();

var getCleaners = (callback) => {

    let query = {'cleaning.isCleaning': true};
    let options = {"limit": 5};

    db.getByQuery("ShoblaMembers", query, options)
        .then(cleaners => {
            callback(cleaners);
        })
        .catch(err => {
            console.log(`ERROR: could not get data for collection ShoblaMembers`);
            callback([]);
        })
}

// TODO: check function
var createNewCleaners = () => {
    
    let query = {'cleaning.isCleaning': false};
    
    var options = {
        "limit": 5,
        "sort": "cleaning.cleaningCount"
    }
    
    db.getByQuery("ShoblaMembers", query, options)
        .then(newCleaners => {

            let query = {'cleaning.isCleaning': false};
            db.updateSpesific(query);
        })
        .catch(err => {
            console.log(`ERROR: could not get data for collection ShoblaMembers`);
            callback([]);
        })

    return res;
}

var CleaningDutyBLApi = {
    'getCleaners' : getCleaners,
    'createNewCleaners': createNewCleaners
}

module.exports = CleaningDutyBLApi;