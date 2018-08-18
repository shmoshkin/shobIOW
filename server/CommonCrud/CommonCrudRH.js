const commonCrudBL = require('./CommonCrudBL');

exports.getAll = function(collection, callback) {
    commonCrudBL.getAll(collection, callback);
}

exports.save = function(collection, model, callback) {
    commonCrudBL.save(collection, model, callback);
}