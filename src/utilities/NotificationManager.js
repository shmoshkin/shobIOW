import socketIOClient from "socket.io-client";
import Notifier from "react-desktop-notification";

let socket = socketIOClient("http://127.0.0.1:3001");

class NotificationManager {

    constructor() {
      
      this.registerEvents();
    }

    registerEvents(){
        
        socket.on("cleaningRemainder", () => {
            Notifier.start("תזכורת","תכף יוצאים הביתה, שים לב שלא שכחת לנקות!","https://he.wikipedia.org/wiki/%D7%96%D7%91%D7%9C","validated image url", "נקיון");
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