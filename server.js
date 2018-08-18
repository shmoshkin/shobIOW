'use strict';

var express = require('express');
var bodyParser = require('body-parser');
const DB = require('./server/DBAccess');
const onStart = require('./server/Hooks/onStart');

// Create our instances
var app = express();

// Set our port to either a predetermined port number if you have set 
// it up, or 3001
var port = process.env.API_PORT || 3001;

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

const api = require("./server/routes/api");

api.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Use our router configuration when we call /api
app.use('/api', api);

// //starts the server and listens for requests
const server = require('http').createServer(app); 
var io = (require('socket.io')(server));
 
server.listen(port, () => {
    
    onStart.on(port, io);
});

module.exports = {io};
