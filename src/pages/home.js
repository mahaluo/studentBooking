import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { SignoutHeader, StudentCalendar } from '../components';
import firebase from '../components/firebase/fbConfig';
import { AuthContext } from '../components/auth/auth';
import '../sass/pages/index.scss';


const Home = React.memo(function Home() {

    var { currentUser, level } = useContext(AuthContext);
    const [page, setPage] = useState('home')

    useEffect(() => {
        console.log('user level is: ' + level);
        if (currentUser != null) {
            console.log('home page current user ' + currentUser);
        }

    }, [currentUser, level, page])

    const handleSignout = () => {
        firebase.auth().signOut().then(function () {
            console.log("user signed out");
            currentUser = null;
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }

    const handlePage = () => {
        if (page === 'home') {
            setPage('profile');
        }
        else {
            setPage('home');
        }
    }

    return (
        <div className="home_container">
            <div className="header"><SignoutHeader handleSignout={() => handleSignout()} handlePage={handlePage} page={page} /></div>

            <div className="home_container__calendar_container">
                {page === 'home' ?
                    <div>
                        {level === 0 ?
                            <div>
                                <StudentCalendar />
                            </div>
                            :
                            null
                        }

                        {level === 1 ?
                            <div>
                                <p>teacher home page</p>
                            </div>
                            :
                            null
                        }

                        {level === 2 ?
                            <div>
                                <p>admin home page</p>
                            </div>
                            :
                            null
                        }



                    </div>
                    :
                    <div>

                        {level === 0 ?
                            <div>
                                <p>student profile page</p>
                            </div>
                            :
                            null
                        }

                        {level === 1 ?
                            <div>
                                <p>teacher profile page</p>
                            </div>
                            :
                            null
                        }

                        {level === 2 ?
                            <div>
                                <p>admin profile page</p>
                            </div>
                            :
                            null
                        }
                    </div>
                }




            </div>

        </div>
    )
})

export default React.memo(withRouter(Home));
