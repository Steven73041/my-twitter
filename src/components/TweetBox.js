import React, { useState } from 'react';
import '../styles/TweetBox.css';
import { Avatar, Button } from '@material-ui/core';
import db from '../firebase';
import firebase from 'firebase';

const TweetBox = ({ user }) => {
    const [tweetMessage, setTweetMessage] = useState('');
    const [tweetImage, setTweetImage] = useState('');
    const sendTweet = e => {
        e.preventDefault();
        if (tweetMessage.length > 5) {
            db.collection('posts').add({
                displayName: user.data.displayName,
                verified: user.data.verified,
                avatar: user.data.avatar,
                username: user.id,
                text: tweetMessage,
                image: tweetImage ? tweetImage : '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            setTweetMessage("");
            setTweetImage("");
        } else {
            alert("Please fill in the Tweet Message! Post must be more than 5 characters.");
        }
    }
    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar src={user.data.avatar} />
                    <input value={tweetMessage} type="text" placeholder="What's happening?" onChange={(e) => setTweetMessage(e.target.value)} />
                </div>
                <input value={tweetImage} type="text" placeholder="Optional: Enter Image URL" className="tweetBox__imageInput" onChange={(e) => setTweetImage(e.target.value)} />
                <Button onClick={sendTweet} type="submit" className="tweetBox__tweetButton">Tweet</Button>
            </form>
        </div>
    );
}

export default TweetBox;
