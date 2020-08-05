import React, { useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import firebase from '../components/firebase/fbConfig';
import { AuthContext } from '../components/auth/auth';
import { Button } from '@material-ui/core';
import '../sass/pages/index.scss';

const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {

    const handleLogin = () => {
        firebase.auth().signInWithRedirect(provider);
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to='/home' />;
    }

    return (
        <div className="signinContainer">
        <p>hej</p>
            <Button onClick={() => handleLogin()} variant="outlined">Sign In</Button>
        </div>
    )
}

export default withRouter(SignIn);