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

import '../assets/css/SignUpStyle.css'
import logo from '../assets/img/logo.png';

import axios from 'axios';


class SignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    handleSubmit() {
        let variant = "";

        let { firstName, lastName, email, password } = this.state;

        axios.post(`http://0.0.0.0:8080/signup?firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}`)
        .then((response) => {
            if (response.data === "Success") {
                console.log("created user");
                this.props.history.push({
                    pathname: "/signin",
                  });
            }
            variant = "error"
            this.props.enqueueSnackbar('The user already exists', { variant });
        }).catch((error) => {
            variant = "error"
            this.props.enqueueSnackbar(error.message, { variant });
        });

    }

    render() {
        return (
            <div className="signIn">
                <div className="image" />
                <Paper className="paper">
                    <img className="signUpLogo" src={logo} alt="Elaisa Search Engine Logo"></img>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Typography variant="body1">
                        See your last searches and follow your progress in learning
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
                                label="First Name"
                                autoFocus
                            />
                            <TextField
                                onChange={e => this.setState({ lastName: e.target.value })}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
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
                                label="Email Address"
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
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div style={{ marginTop: "5%" }}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="secondary" />}
                                label="I agree that Elaisa is allowed to store my searching history."
                            />
                        </div>
                        <Button
                            //type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className="submit"
                            onClick={this.handleSubmit.bind(this)}
                            disabled={this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.email.length === 0 || this.state.password.length === 0}
                        >
                            Sign Up
                        </Button>
                        <div className="backLink">
                            <Link href="/signin" variant="body2" id="signInLink">
                                Already have an account? Sign in
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

const SignUpIntegrationNotistack = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <SignUpSnackBar />
    </SnackbarProvider>
  );
}

export default SignUpIntegrationNotistack;


