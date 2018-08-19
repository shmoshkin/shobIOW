'use strict';

var schedule = require('node-schedule');
const cleaningDutyBL = require('../CleaningDuty/CleaningDutyBL');
const SocketManager = require('../Chat/SocketManager');

var newCleanersInterval;
var cleaningRemainderSchedule;
var curIo = "";
var on = (port, io) => {
     curIo = io; 
    registerIoEvents(io);

    console.log(`api running on port ${port}`);
}

var off = () => {

    clearInterval(newCleanersInterval);
    cleaningRemainderSchedule.cancel();
}

var registerIoEvents = (io) => {
    
    io.on('connection', SocketManager.onStart);
    
}

var emit = (toEmit) => {
    curIo.emit(toEmit);
}

module.exports = {on,off,emit};