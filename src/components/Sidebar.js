import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import '../styles/Sidebar.css';
import SidebarOption from '../components/SidebarOption';

const Sidebar = ({ user }) => {
    const [{ }, dispatch] = useStateValue();

    const firebaseLogout = (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(function () {
            dispatch({
                type: actionTypes.SET_USER_TERM,
                user: {},
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="sidebar">
            {/* Twitter Icon */}
            <TwitterIcon className="sidebar_twitterIcon" />

            {/* SidebarOption */}
            <SidebarOption active Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
            <SidebarOption Icon={ListAltIcon} text="Lists" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />


            {/* Logout Button */}
            {user ? <Button className="firebaseLogoutButton" onClick={firebaseLogout}>Logout</Button> : null}

            {/* Button->Tweet */}
            <Button className="sidebar__tweet" fullWidth>Tweet</Button>
        </div>
    );
}

export default Sidebar;