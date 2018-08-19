import socketIOClient from "socket.io-client";
import Notifier from "react-desktop-notification";

let socket = socketIOClient("http://127.0.0.1:3001");

class NotificationManager {

    constructor() {
      
      this.registerEvents();
    }

    registerEvents(){
        
        socket.on("newEvent", () => {
            Notifier.start("אירוע דוצ","שים לב כי נוסף אירוע חדש למערכת","https://he.wikipedia.org/wiki/%D7%90%D7%A9_%D7%9B%D7%95%D7%97%D7%95%D7%AA%D7%99%D7%A0%D7%95","validated image url", "איוע דוצ");
        });

        socket.on('error', function (err) {
            console.log('received socket error: ' + err);
        })
    }

    static get socket () {
        return socket;
    }
}

export default NotificationManager;