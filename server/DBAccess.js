"use strict";

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

class DB {
    constructor() {
        var _this = this

        if (!this.db) {
            MongoClient.connect('mongodb://may:1234@ds229918.mlab.com:29918/shobla', function (err, database) {
                _this.db = database.db("shobla");
            });
        }
    }

    getAll(collection) {
        try {
            return this.db.collection(collection).find({}).toArray();
        } 
        catch (err) {
            console.log(`ERROR: could not get data for collection ${collection}`);
        }
    }

    deleteByIds(collection, ids, res) {
        try {
            this.db.collection(collection).remove({"_id":{"$in":ids}});
        } 
        catch (err) {
            console.log(`ERROR: could not delete data from collection ${collection}`);
        }
        res.json({});
    }

    getByQuery(collection, query = {}, options = {}) {

        try {
            return this.db.collection(collection).find(query, options).toArray();
        } 
        catch (err) {
            console.log(`ERROR: could not get data for collection ${collection}`);
        }
    }

    save(collection, elem) {

        try {
            return this.db.collection(collection).update({_id:elem._id}, {...elem}, {upsert: true});
        } 
        catch (err) {
            console.log(`ERROR: could not save elem in collection ${collection}`);
        }
    }
    
    insert(collection, elem, res) {
        
        try {
            this.db.collection(collection).insert(elem);
        } 
        catch (err) {
            console.log(`ERROR: could not insert elem to collection ${collection}`);
        }
        res.json({});
    }

    update(collection, elem, res) {
        
        try {
            this.db.collection(collection).update({_id:elem._id}, {elem});
        } 
        catch (err) {
            console.log(`ERROR: could not insert elem to collection ${collection}`);
        }
        res.json({});
    }

    findAndModify(collection, query = {}, sort = [['_id', 'asc']], updatedFields = {}, options = {}) {
        
        try{

            this.db.collection(collection).findAndModify(
                query,
                sort,
                {$set: updatedFields},
                options);
        }
        catch(err){
            console.log(`ERROR: could not insert elem to collection ${collection}`);            
        }
    }

    // TODO: update spesific fields
    updateSpesific() {

    }

    getNextSequence(name) {

        var sequenceDocument = db.collection(collection).findAndModify({
           query:{_id: name },
           update: {$inc:{value:1}},
           new:true
        });
         
        return sequenceDocument.value;
    }
}

module.exports = DB
