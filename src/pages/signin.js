import React, { useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { SigninHeader } from '../components';
import firebase from '../components/firebase/fbConfig';
import { AuthContext } from '../components/auth/auth';
import '../sass/pages/index.scss';

const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {

    const handleSignin = () => {
        firebase.auth().signInWithRedirect(provider);
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to='/home' />;
    }

    return (
        <div className="signin_container">
            <div className="header"><SigninHeader handleSignin={() => handleSignin()} /></div>

            <div className="signin_container__signin">
            <p>hej</p>
            </div>
        
        </div>
    )
}

export default withRouter(SignIn);