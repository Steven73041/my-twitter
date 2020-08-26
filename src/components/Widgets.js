import React from 'react';
import '../styles/Widgets.css';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed } from 'react-twitter-embed';
import SearchIcon from '@material-ui/icons/Search';

const Widgets = () => {
    return (
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon className="widgets__searchIcon" />
                <input type="text" placeholder="Search Twitter" />
            </div>

            <div className="widgets__widgetContainer">
                <h2>What's Happening?</h2>
                <TwitterTweetEmbed tweetId={"1296139181601828864"} />

                <TwitterTimelineEmbed sourceType="profile" screenName="olympiacosfc" options={{ height: 400 }} />

                <TwitterShareButton url={"https://google.gr"} options={{ text: "#ReactJS is awesome!", via: "Steven73041" }} />
            </div>
        </div>
    );
}

export default Widgets;
