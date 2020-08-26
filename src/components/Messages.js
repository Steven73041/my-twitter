import React from 'react';
import db from '../firebase';
import firebase from 'firebase';
import '../styles/Messages.css';
import { Avatar, Button } from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import MessagesFeed from '../components/MessagesFeed';

const Messages = ({ user }) => {
    return (
        <div className="messages">
            <Sidebar user={user} />
            <MessagesFeed user={user} />
            <Widgets />
        </div>
    );
}

export default Messages;
