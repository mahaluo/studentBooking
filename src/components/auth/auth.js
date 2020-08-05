import React, { useEffect, useState, createContext } from 'react';
import firebase from '../firebase/fbConfig';

import { Grid, CircularProgress } from '@material-ui/core'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    //var token = result.credential.accessToken;
                    // ...
                    setCurrentUser(result.user.email);
                    console.log(result.user.email);
                }
                else {
                    setCurrentUser(null);
                }
                // The signed-in user info.
                //var user = result.user;
             
            }).catch(function (error) {
                // Handle Errors here.
                //var errorCode = error.code;
                //var errorMessage = error.message;
                // The email of the user's account used.
                //var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                //var credential = error.credential;
                // ...
            });
            setPending(false)
        });
    }, []);

    if (pending) {

        return (
            <Grid container item xs={12} justify="center" align="center" styles={{ margin: "auto", marginTop: "auto" }}>
                <CircularProgress color="primary" />
            </Grid>
        )

    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}
