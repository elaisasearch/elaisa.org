import React from 'react';
import { Fab, Grid, Typography, Paper, Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core/';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withRouter } from "react-router-dom";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { Translate } from "react-localize-redux";
import HeaderTags from '../components/HeaderTags';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/styles';
import globals from '../globals.json';

import logo from '../assets/img/logo.png';

import axios from 'axios';

const useStyles = makeStyles({
    signupRoot: {
        height: '100vh'
    },
    backFab: {
        width: '90%',
        margin: '5%',
        flex: 1
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
    signUpLogo: {
        width: '25%',
        marginTop: '10%',
        marginBottom: '5%'
    },
    form: {
        width: '90%',
        margin: '5%'
    },
    divNames: {
        display: isMobile ? null : 'flex',
        justifyContent: 'flex-end'
    },
    signUpSubtitle: {
        width: isMobile ? '80%' : null,
        textAlign: isMobile ? 'center' : null
    },
    agreeTermsButton: {
        marginTop: '5%',
        marginBottom: isMobile ? '5%' : null
    }
});

/**
 * SignUp view class.
 * @param {object} props the given properties.
 * @returns {JSX} signUp view jsx components.
*/
const SignUp = (props) => {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [agreesTermsOfService, setAgreesTermsOfService] = React.useState(false);

    const classes = useStyles();

    /**
     * checks user's sign up data with API request and changes url path.
    */
    const handleSubmit = () => {
        let variant = "";

        axios.post(`https://api.elaisa.org/signup?firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}&key=${globals['api']['x-api-key']}`)
            .then((response) => {
                if (response.data === "Success") {

                    setTimeout(() => {
                        props.history.push({
                            pathname: "/signin",
                        });
                    }, 2000)

                    variant = "success";
                    props.enqueueSnackbar('Successfully created the user', { variant });
                } else if (response.data === "Error") {
                    variant = "error"
                    props.enqueueSnackbar('The user already exists', { variant });
                }
            }).catch((error) => {
                variant = "error"
                props.enqueueSnackbar(error.message, { variant });
            });

    }

    /**
     * Renders JSX content.
     * @returns {JSX} SignUp.js.
    */
    return (
        <Grid container className={classes.signupRoot}>
            <HeaderTags
                title="Elaisa Search Engine - Sign Up"
                desc="Sign Up to the Elaisa Search Engine to store your search history and comprehend your state of knowledge in your profile."
                keywords="Sign Up, Search History, Profile"
            />
            {!isMobile ? <Grid item xs className={classes.sideImage} /> : null}
            <Paper className={classes.formPaper}>
                <img className={classes.signUpLogo} src={logo} alt="Elaisa Search Engine Logo"></img>
                <Typography component="h1" variant="h5">
                    <Translate id='UI__SIGN_UP_PAGE__TITLE' />
                </Typography>
                <Typography variant="body1" className={classes.signUpSubtitle}>
                    <Translate id='UI__SIGN_UP_PAGE__SUBTITLE' />
                </Typography>
                <form className={classes.form} noValidate>

                    <div className={classes.divNames}>
                        <TextField
                            onChange={e => setFirstName(e.target.value)}
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label={<Translate id='UI__SIGN_UP_PAGE__FIRSTNAME_FIELD' />}
                        />
                        <TextField
                            onChange={e => setLastName(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label={<Translate id='UI__SIGN_UP_PAGE__LASTNAME_FIELD' />}
                            name="lastName"
                            autoComplete="lastName"
                            style={{ marginTop: isMobile ? '5%' : null }}
                        />
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label={<Translate id='UI__SIGN_UP_PAGE__EMAIL_FIELD' />}
                            name="email"
                            autoComplete="email"
                        />
                    </div>
                    <div style={{ marginTop: "5%" }}>
                        <TextField
                            onChange={e => setPassword(e.target.value)}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label={<Translate id='UI__SIGN_UP_PAGE__PASSWORD_FIELD' />}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className={classes.agreeTermsButton}>
                        <FormControlLabel
                            control={<Checkbox value="agreeTermsOfService" color="secondary" />}
                            label={<Translate id='UI__SIGN_UP_PAGE__AGREE_TERMS_BUTTON' />}
                            onClick={e => setAgreesTermsOfService(e.target.checked)}
                        />
                    </div>
                    <Button
                        //type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className="submit"
                        onClick={handleSubmit}
                        disabled={firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || !agreesTermsOfService}
                    >
                        <Translate id='UI__SIGN_UP_PAGE__SIGN_UP_BUTTON' />
                    </Button>
                    <Button style={{ fontSize: '70%' }} href="/signin" variant='text'>
                        <Translate id='UI__SIGN_UP_PAGE__SIGN_IN_BUTTON' />
                    </Button>
                </form>
                <Grid container alignItems='flex-end' direction='column-reverse' className={classes.backFab}>
                    <Fab href="/signin" color="secondary">
                        <UpIcon />
                    </Fab>
                </Grid>
            </Paper>
        </Grid>
    );
}

const SignUpSnackBar = withSnackbar(withRouter(SignUp));

/**
 * Adds Notification Snack Bar.
 * @returns {JSX} the SignUp View Snack Bar Integration.
*/
const SignUpIntegrationNotistack = () => {
    return (
        <SnackbarProvider maxSnack={3}>
            <SignUpSnackBar />
        </SnackbarProvider>
    );
}

export default SignUpIntegrationNotistack;


