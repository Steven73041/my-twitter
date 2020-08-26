import React, { forwardRef } from 'react';
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';
import '../styles/Post.css';


const Post = forwardRef(({ displayName, username, text, verified, image, avatar, timestamp }, ref) => {
    const date = timestamp ? timestamp.toDate().toString() : Date.now().toString();
    return (
        <div className="post" ref={ref}>
            <div className="post__avatar">
                <Avatar src={avatar} />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__headerText">
                        <h3>
                            {displayName}
                            <span className="post__headerSpecial">
                                {verified && <VerifiedUserIcon className="post__badge" />}@{username}
                            </span>
                            <span className="post__timestamp">{date.substring(0, 24)}</span>
                        </h3>
                    </div>
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                    {image ? <img src={image} alt={text} /> : null}
                    <div className="post__footer">
                        <ChatBubbleOutlinedIcon fontSize="small" />
                        <RepeatIcon fontSize="small" />
                        <FavoriteBorderIcon fontSize="small" />
                        <PublishIcon fontSize="small" />
                    </div>
                </div>
            </div>
        </div>
    );
});
export default Post;