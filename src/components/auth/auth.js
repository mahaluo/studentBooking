import React, { useEffect, useState, createContext } from 'react';
import firebase from '../firebase/fbConfig';

import { Grid, CircularProgress } from '@material-ui/core'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [level, setLevel] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setCurrentUser(null);
            }
            setPending(false)
        });

        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = result.credential.accessToken;
                // ...
                setCurrentUser(result.user.email);
                console.log(result.user.email);

                if (result.user.email === 'contactburnthevillage@gmail.com') {
                    setLevel(2);
                    console.log('admin logged in');
                }
                else {

                    var num = parseInt(result.user.email.substr(0, 4));

                    if (num) {
                        setLevel(0);
                        console.log('student logged in');
                    }
                    else {
                        setLevel(1);
                        console.log('teacher logged in');
                    }
                }
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
    }, [currentUser]);

    if (pending) {

        return (
            <Grid container item xs={12} justify="center" align="center" styles={{margin: "auto", marginTop: "auto"}}>
                <CircularProgress color="primary" />
            </Grid>
        )

    }

    return (
        <AuthContext.Provider value={{ currentUser, level }}>
            {children}
        </AuthContext.Provider>
    )
}
