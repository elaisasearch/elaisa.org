import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withRouter } from "react-router-dom";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Translate } from "react-localize-redux";
import HeaderTags from '../components/HeaderTags';
import MailInput from '../components/SplashDialog/MailInput';


import axios from 'axios';

import '../assets/css/SignInStyle.css'
import logo from '../assets/img/logo.png';

/**
 * SignIn view class.
 * @param {object} props the given properties.
 * @returns {JSX} signIn view jsx components.
*/
class SignIn extends Component {

    state = {
        email: "",
        password: "",
        changePasswordDialogOpen: false
    }

    handleCloseChangePasswordDialog = () => {
        this.setState({
            changePasswordDialogOpen: false
        });
    }

    /**
     * Checks the user's login data with API post request and stores to redux.
     * @param {event} event the clicked key event
    */
    keyPress = (e) => {
        // get the input when user cliks enter (13)
        if (e.keyCode === 13) {
            this.handleSignIn()
        }
    }

    /**
     * Checks the user's login data with API post request and stores to redux.
    */
    handleSignIn = () => {
        let variant = "";

        axios.post(`http://api.elaisa.org/signin?email=${this.state.email}&password=${this.state.password}`)
            .then((response) => {
                if (response.data.response === "Success") {
                    
                    const { email, firstname, lastname } = response.data.user;
                
                    // redux action
                    this.props.onSignIn(email, firstname, lastname);

                    // navigate to App.js
                    this.props.history.push({
                        pathname: "/"
                    });

                    variant = "success";
                    this.props.enqueueSnackbar('Successfully logged in user', { variant });
                } else {
                    variant = "error"
                    this.props.enqueueSnackbar('Password or Username incorrect', { variant });
                }
            }).catch((error) => {
                variant = "error"
                this.props.enqueueSnackbar(error.message, { variant });
            });
    }

    render() {
        return (
            <div className="signIn">
                <MailInput open={this.state.changePasswordDialogOpen} handleClose={this.handleCloseChangePasswordDialog}/>
                <HeaderTags 
                 title="Elaisa Search Engine - Sign In"
                 desc="Sign in to the Elaisa Search Engine to store your search history and comprehend your state of knowledge in your profile."
                 keywords="Sign In, Search History, Profile"
                />
                <div className="image" />
                <Paper className="paper">
                    <img className="signInLogo" src={logo} alt="Elaisa Search Engine Logo"></img>
                    <Typography component="h1" variant="h5">
                        <Translate id='UI__SIGN_IN_PAGE__TITLE' />
                    </Typography>
                    <form className="form" noValidate>
                        <TextField
                            onChange={e => this.setState({ email: e.target.value })}
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
                            onKeyDown={this.keyPress}
                            onChange={e => this.setState({ password: e.target.value })}
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
                            onClick={this.handleSignIn.bind(this)}
                            disabled={this.state.email.length === 0 || this.state.password.length === 0}
                        >
                            <Translate id='UI__SIGN_IN_PAGE__SIGN_IN_BUTTON' />
                        </Button>
                        <Grid container >
                            <Grid item xs>
                                <Button 
                                    style={{fontSize: '70%'}}
                                    onClick={e => this.setState({changePasswordDialogOpen: true})}
                                >
                                    <Translate id='UI__SIGN_IN_PAGE__FORGOT_PASSWORD_BUTTON' />
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button style={{fontSize: '70%'}} id="link" href="/signup" variant="text">
                                    <Translate id='UI__SIGN_IN_PAGE__SIGN_UP_BUTTON' />
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <div className="fab">
                        <Fab href="/" color="secondary">
                            <UpIcon />
                        </Fab>
                    </div>

                </Paper>
            </div>
        );
    }
};

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

