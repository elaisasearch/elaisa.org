import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withRouter } from "react-router-dom";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { Translate } from "react-localize-redux";

import '../assets/css/SignUpStyle.css'
import logo from '../assets/img/logo.png';

import axios from 'axios';

/**
 * SignUp view class.
 * @param {object} props the given properties.
 * @returns {JSX} signUp view jsx components.
*/
class SignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        agreesTermsOfService: false
    }

    /**
     * checks user's sign up data with API request and changes url path.
    */
    handleSubmit() {
        let variant = "";

        let { firstName, lastName, email, password } = this.state;

        axios.post(`http://api.elaisa.org/signup?firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}`)
        .then((response) => {
            if (response.data === "Success") {

                setTimeout(() => {
                    this.props.history.push({
                        pathname: "/signin",
                      });
                }, 2000)

                variant = "success";
                this.props.enqueueSnackbar('Successfully created the user', { variant });
            } else if (response.data === "Error") {
                variant = "error"
                this.props.enqueueSnackbar('The user already exists', { variant });
            }
        }).catch((error) => {
            variant = "error"
            this.props.enqueueSnackbar(error.message, { variant });
        });

    }

    /**
     * Renders JSX content.
     * @returns {JSX} SignUp.js.
    */
    render() {
        return (
            <div className="signIn">
                <div className="image" />
                <Paper className="paper">
                    <img className="signUpLogo" src={logo} alt="Elaisa Search Engine Logo"></img>
                    <Typography component="h1" variant="h5">
                        <Translate id='UI__SIGN_UP_PAGE__TITLE' />
                    </Typography>
                    <Typography variant="body1">
                        <Translate id='UI__SIGN_UP_PAGE__SUBTITLE' />
                    </Typography>
                    <form className="form" noValidate>

                        <div className="divNames">
                            <TextField
                                onChange={e => this.setState({ firstName: e.target.value })}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={<Translate id='UI__SIGN_UP_PAGE__FIRSTNAME_FIELD' />}
                            />
                            <TextField
                                onChange={e => this.setState({ lastName: e.target.value })}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label={<Translate id='UI__SIGN_UP_PAGE__LASTNAME_FIELD' />}
                                name="lastName"
                                autoComplete="lname"
                            />
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            <TextField
                                onChange={e => this.setState({ email: e.target.value })}
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
                                onChange={e => this.setState({ password: e.target.value })}
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
                        <div style={{ marginTop: "5%" }}>
                            <FormControlLabel
                                control={<Checkbox value="agreeTermsOfService" color="secondary" />}
                                label={<Translate id='UI__SIGN_UP_PAGE__AGREE_TERMS_BUTTON' />}
                                onClick={e => this.setState({ agreesTermsOfService: e.target.checked })}
                            />
                        </div>
                        <Button
                            //type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className="submit"
                            onClick={this.handleSubmit.bind(this)}
                            disabled={this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.email.length === 0 || this.state.password.length === 0 || !this.state.agreesTermsOfService} 
                        >
                            <Translate id='UI__SIGN_UP_PAGE__SIGN_UP_BUTTON' />
                        </Button>
                        <div className="backLink">
                            <Link href="/signin" variant="body2" id="signInLink">
                                <Translate id='UI__SIGN_UP_PAGE__SIGN_IN_BUTTON' />
                            </Link>
                        </div>
                    </form>
                    <div className="fab">
                        <Fab href="/signin" color="secondary">
                            <UpIcon />
                        </Fab>
                    </div>

                </Paper>
            </div>
        );
    }

};

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


