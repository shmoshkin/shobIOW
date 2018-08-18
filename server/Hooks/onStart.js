'use strict';

var schedule = require('node-schedule');
const cleaningDutyBL = require('../CleaningDuty/CleaningDutyBL');
const SocketManager = require('../Chat/SocketManager');

var newCleanersInterval;
var cleaningRemainderSchedule;

var on = (port, io) => {
    
    registerIoEvents(io);

    // if(new Date().getDay() == 6 || cleaningDutyBL.getCleaners.length == 0){

    //     cleaningDutyBL.createNewCleaners();
    // }

    newCleanersInterval = setInterval(() => {
        
        if(new Date().getDay() == 6){

            cleaningDutyBL.createNewCleaners();
        }

    }, 86400000);

    console.log(`api running on port ${port}`);
}

var off = () => {

    clearInterval(newCleanersInterval);
    cleaningRemainderSchedule.cancel();
}

var registerIoEvents = (io) => {
    
    io.on('connection', SocketManager.onStart)
    
    var rule = new schedule.RecurrenceRule();
    rule.hour = 17;
    rule.minute = 0;
    rule.dayOfWeek = new schedule.Range(0,4);
    
    var cleaningRemainderSchedule = schedule.scheduleJob(rule, function() {
        
        io.emit("cleaningRemainder");
        let time = new Date().getHours().toString() + " : " + new Date().getMinutes().toString();
        console.log('cleaningRemainder: ' + time);
    });
}

module.exports = {on,off};