import React, { useState } from 'react';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
import db from '../firebase';
import '../styles/AuthenticationScreen.css';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const AuthenticationScreen = () => {

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userExists, setUserExists] = useState(false);
    const [{ }, dispatch] = useStateValue();

    const createAccount = (e) => {
        e.preventDefault();
        if (email && displayName && username && password) {
            //check if username exists
            var UserCollection = db.collection('users');
            setUserExists(false);
            UserCollection.doc(username).get().then((document) => {
                if (document.exists) {
                    setUserExists(true);
                }
            });
            UserCollection.where("email", "==", email).get().then((querySnapshot) => {
                var userFound = querySnapshot.docs[0] ? querySnapshot.docs[0].exists : false;
                if (!userExists) {
                    setUserExists(userFound);
                }
            });

            if (!userExists) {
                firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
                    UserCollection.doc(username).set({
                        displayName: displayName,
                        email: email,
                        username: username,
                        verified: true,
                        avatar: avatar,
                    }).then((response) => {
                        UserCollection.where("email", "==", email).get().then((querySnapshot) => {
                            setError(null);
                            dispatch({
                                type: actionTypes.SET_USER_TERM,
                                user: { id: querySnapshot.docs[0].id, data: querySnapshot.docs[0].data() },
                            });
                        });
                    })
                }).catch(function (error) {
                    //if error, set error
                    var errorMessage = error.message;
                    setError(errorMessage);
                });;
                //if exists
            } else {
                //set error if username exists
                setError("Username already exists.");
            }
            //if values set
        } else {
            alert("Please fill the Display Name, Username, e-mail & Password");
        }
    }

    return (
        <div className="authScreen">
            <div id="firebaseui-auth-container"></div><div id="loader">Loading...</div>
            <div className="firebaseuiRegister">
                {error ? <ul className="registerErrors"><li>{error}</li></ul> : null}
                <h2>Not a user? Register now!</h2>
                <form className="registerForm" type="POST">
                    <div className="registerFormGroup">
                        <input type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} name="email" value={email} required />
                        <input type="text" placeholder="Display Name" onChange={(e) => { setDisplayName(e.target.value) }} name="displayName" value={displayName} required />
                    </div>
                    <div className="registerFormGroup">
                        <input type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} name="username" value={username} required />
                        <input type="text" placeholder="Avatar" onChange={(e) => { setAvatar(e.target.value) }} name="avatar" value={avatar} />
                    </div>
                    <div className="registerFormGroup">
                        <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} name="password" value={password} required />
                    </div>
                    <div className="registerFormGroup">
                        <Button className="registerButton" type="submit" onClick={createAccount}>Register</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AuthenticationScreen;