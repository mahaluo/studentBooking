import React, { useContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import { Header } from '../components';
import { Link } from 'react-router-dom';
import firebase from '../components/firebase/fbConfig';
import { AuthContext } from '../components/auth/auth';
import '../sass/pages/index.scss';


const Home = React.memo(function Home() {
    //level 0 - student
    //level 1 - teacher
    //level 2 - admin?

    const [level, setLevel] = useState(0);
    var { currentUser } = useContext(AuthContext);
   

    useEffect(() => {   
        if (currentUser != null) {
            console.log('home page current user ' + currentUser);
            var num = parseInt(currentUser.substr(0, 4));
            if (num) {
                setLevel(0);
                console.log('student logged in');
            }
            else {
                setLevel(1);
                console.log('teacher logged in');
            }
        }
      
    }, [currentUser])

    const handleSignout = () => {
        firebase.auth().signOut().then(function () {
            console.log("user signed out");
            currentUser = null;
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <div className="homeContainer">
            {/* <div><Header /></div> */}

            <div>
                <p>Hej</p>
                <div><Link to='/' onClick={() => handleSignout()}>signout</Link></div>

                {level === 0 ? <div><p>student</p></div> : <div><p>teacher</p></div>}

            </div>

        </div>
    )
})

export default React.memo(withRouter(Home));
