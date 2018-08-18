import React, { Component } from 'react';
import notificationManager from '../../utilities/NotificationManager';
import { USER_CONNECTED, LOGOUT } from '../../common/ChatEvents';

let notification = {};

export default class Layout extends Component {

    constructor(props) {

        super(props);
        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {

        this.initSocket();
    }

    initSocket = () => {

        notification = new notificationManager();
        this.setState({ socket : notificationManager.socket });
    }

    setUser = (user) => {

        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    }

    logOut = () => {

        const { socket } = this.state;
        socket.emit(LOGOUT);
        this.setState({user: null})
    }

    render() {

        const {title} = this.props;
        const {socket, user} = this.state;

        return (
            <div className="container">

            </div>
        );
    }
}