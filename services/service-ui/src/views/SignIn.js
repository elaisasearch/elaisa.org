import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Fab, Grid, Paper } from '@material-ui/core/';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withRouter } from "react-router-dom";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Translate } from "react-localize-redux";
import HeaderTags from '../components/HeaderTags';
import MailInput from '../components/Dialogs/MailInput';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/styles';

import axios from 'axios';

import logo from '../assets/img/logo.png';

const useStyles = makeStyles({
    signinRoot: {
        height: '100vh'
    },
    formPaper: {
        display: 'flex',
        flex: isMobile ? 1 : 0.7,
        flexDirection: 'column',
        alignItems: 'center'
    },
    sideImage: {
        backgroundImage: 'url(https://source.unsplash.com/random);',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    signInLogo: {
        width: '25%',
        marginTop: '10%',
        marginBottom: '5%'
    },
    form: {
        width: '90%',
        margin: '5%'
    },
    backFab: {
        width: '90%',
        margin: '5%'
    }

});

/**
 * SignIn view class.
 * @param {object} props the given properties.
 * @returns {JSX} signIn view jsx components.
*/
const SignIn = (props) => {

    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [changePasswordDialogOpen, setChangePasswordDialogOpen] = React.useState(false);

    const classes = useStyles();

    const handleCloseChangePasswordDialog = () => {
        setChangePasswordDialogOpen(false)
    }

    /**
     * Checks the user's login data with API post request and stores to redux.
     * @param {event} event the clicked key event
    */
    const keyPress = (e) => {
        // get the input when user cliks enter (13)
        if (e.keyCode === 13) {
            handleSignIn()
        }
    }

    /**
     * Checks the user's login data with API post request and stores to redux.
    */
    const handleSignIn = () => {
        let variant = "";

        axios.post(`https://api.elaisa.org/signin?email=${email}&password=${password}`)
            .then((response) => {
                if (response.data.response === "Success") {

                    const { email, firstname, lastname } = response.data.user;

                    // redux action
                    props.onSignIn(email, firstname, lastname);

                    // navigate to App.js
                    props.history.push({
                        pathname: "/"
                    });

                    variant = "success";
                    props.enqueueSnackbar('Successfully logged in user', { variant });
                } else {
                    variant = "error"
                    props.enqueueSnackbar('Password or Username incorrect', { variant });
                }
            }).catch((error) => {
                variant = "error"
                props.enqueueSnackbar(error.message, { variant });
            });
    }

    return (
        <Grid container className={classes.signinRoot}>
            <MailInput open={changePasswordDialogOpen} handleClose={handleCloseChangePasswordDialog} />
            <HeaderTags
                title="Elaisa Search Engine - Sign In"
                desc="Sign in to the Elaisa Search Engine to store your search history and comprehend your state of knowledge in your profile."
                keywords="Sign In, Search History, Profile"
            />
            {!isMobile ? <Grid item xs className={classes.sideImage} /> : null}
            <Paper className={classes.formPaper}>
                <img className={classes.signInLogo} src={logo} alt="Elaisa Search Engine Logo"></img>
                <Typography component="h1" variant="h5">
                    <Translate id='UI__SIGN_IN_PAGE__TITLE' />
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={e => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={<Translate id='UI__SIGN_IN_PAGE__EMAIL_FIELD' />}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onKeyDown={keyPress}
                        onChange={e => setPassword(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={<Translate id='UI__SIGN_IN_PAGE__PASSWORD_FIELD' />}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label={<Translate id='UI__SIGN_IN_PAGE__REMEMBER_ME_BUTTON' />}
                    />
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className="submit"
                        onClick={handleSignIn}
                        disabled={email.length === 0 || password.length === 0}
                    >
                        <Translate id='UI__SIGN_IN_PAGE__SIGN_IN_BUTTON' />
                    </Button>
                    <Grid container >
                        <Grid item xs>
                            <Button
                                style={{ fontSize: '70%' }}
                                onClick={e => setChangePasswordDialogOpen(true)}
                            >
                                <Translate id='UI__SIGN_IN_PAGE__FORGOT_PASSWORD_BUTTON' />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button style={{ fontSize: '70%' }} href="/signup" variant="text">
                                <Translate id='UI__SIGN_IN_PAGE__SIGN_UP_BUTTON' />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid container xs alignItems='flex-end' direction='column-reverse' className={classes.backFab}>
                    <Fab href="/" color="secondary">
                        <UpIcon />
                    </Fab>
                </Grid>

            </Paper>
        </Grid>
    );
}

/**
 * Maps redux signIn action to props.
 * @param {object} dispatch the current redux store.
 * @returns {any} redux action to props mapping.
*/
const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, firstname, lastname) => dispatch({ type: 'SIGN_IN', email: email, firstname: firstname, lastname: lastname })
    };
};

const SignInSnackBar = withSnackbar(withRouter(connect(null, mapDispatchToProps)(SignIn)));

/**
 * Adds Notification Snack Bar.
 * @returns {JSX} the SignIn View Snack Bar Integration.
*/
const IntegrationNotistack = () => {
    return (
        <SnackbarProvider maxSnack={3}>
            <SignInSnackBar />
        </SnackbarProvider>
    );
}

export default IntegrationNotistack;

