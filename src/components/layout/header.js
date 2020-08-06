import React, { useContext } from 'react';
import { AuthContext } from '../auth/auth';
import '../../sass/components/index.scss';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function SigninHeader({ handleSignin }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        AIT Student Booking
            </Typography>
                    <Button onClick={() => handleSignin()} color="inherit">Sign in</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export function SignoutHeader({ handleSignout, handlePage, page }) {


    const classes = useStyles();
    var { currentUser } = useContext(AuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <IconButton onClick={handlePage}>
                        {page === 'home' ?
                            <AccountCircleIcon />
                            :
                            <HomeIcon />
                        }
                    </IconButton>


                    <Typography variant="h6" className={classes.title}>
                        AIT Student Booking - {currentUser}
                    </Typography>
                    <Button onClick={() => handleSignout()} color="inherit">Sign out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SigninHeader.propTypes = {
    handleSignin: PropTypes.func.isRequired
}
SignoutHeader.propTypes = {
    handleSignout: PropTypes.func,
    handlePage: PropTypes.func,
}
