'use strict';

const DB = require('../DBAccess');
var db = new DB();

exports.getAll = function(collection, callback) {

    db.getAll(collection)
        .then(data => {
            callback(data);
        });
}

exports.save = function(collection, model, callback) {

    db.save(collection, model)
        .then(data => {
            callback(data);
        });
}