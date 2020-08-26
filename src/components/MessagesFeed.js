import React from 'react';
import '../styles/MessagesFeed.css';
import { Link } from "react-router-dom";

const MessagesFeed = () => {
    return (
        <div className="messagesFeed">
            <h1>Feed incoming</h1>
            <Link to="/">Home</Link>
        </div>
    );
}
export default MessagesFeed;