import React from 'react';
import db from '../firebase';
import firebase from 'firebase';
import '../styles/ReadMe.css';
import { Avatar, Button } from '@material-ui/core';
import { Link } from "react-router-dom";

const ReadMe = () => {
    return (
        <div className="readMe">
            <h1>Under Construction!</h1>
            <Link to="/">Home</Link>
        </div>
    );
}
export default ReadMe;