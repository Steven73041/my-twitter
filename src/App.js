import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';
import './App.css';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import db from './firebase';
import AuthenticationScreen from './components/AuthenticationScreen';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReadMe from './components/ReadMe';
import Messages from './components/Messages';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  // let { path, url } = useRouteMatch();
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        let email = authResult.user.email;
        db.collection('users').where("email", "==", email).get().then(function (querySnapshot) {
          dispatch({
            type: actionTypes.SET_USER_TERM,
            user: { id: querySnapshot.docs[0].id, data: querySnapshot.docs[0].data() },
          });
        });
        return;
      },
      uiShown: function () {
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    var fireabaseuiElement = document.getElementById('firebaseui-auth-container');
    if (fireabaseuiElement) {
      ui.start('#firebaseui-auth-container', uiConfig);
    } else {
      ui.reset();
    }
  }, [user]);

  return (
    <Router>
      <div className="notice">
        <h3>{"Register, Login Working! 2nd version! Updated state handling using React Context API"}</h3>
        {/* <Link onClick={() => { setParam("read-me") }} to={`/read-me`}>Read me!</Link> */}
      </div>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {!user?.data ?
              <AuthenticationScreen /> :
              <><Sidebar user={user} />
                <Feed user={user} />
                <Widgets />
              </>}
          </Route>
          <Route path="/read-me">
            <ReadMe />
          </Route>
          <Route path="/messages">
            <Messages user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;