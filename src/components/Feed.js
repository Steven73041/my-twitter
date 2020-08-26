import React, { useState, useEffect } from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import db from '../firebase';
import '../styles/Feed.css';
import FlipMove from 'react-flip-move';

const Feed = ({ user }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
            setPosts(snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id })))
        ))
    }

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox user={user ? user : null} />
            <FlipMove>
                {posts.length ? posts.map(post => (
                    <Post key={post.id}
                        displayName={post.data.displayName}
                        verified={post.data.verified}
                        avatar={post.data.avatar}
                        username={post.data.username}
                        text={post.data.text}
                        image={post.data.image}
                        timestamp={post.data.timestamp}
                    />
                )
                ) : null}
            </FlipMove>
        </div>
    );
}
export default Feed;