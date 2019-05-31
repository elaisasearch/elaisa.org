import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withRouter } from "react-router-dom";
import { SnackbarProvider, withSnackbar } from 'notistack';
import { connect } from 'react-redux';

import axios from 'axios';

import '../assets/css/SignInStyle.css'
import logo from '../assets/img/logo.png';

class SignIn extends Component {

    state = {
        email: "",
        password: "",
    }

    handleSignIn = () => {
        let variant = "";

        axios.post(`http://0.0.0.0:8080/signin?email=${this.state.email}&password=${this.state.password}`)
            .then((response) => {
                if (response.data.response === "Success") {
                    console.log("user logged in");

                    const { email, firstname, lastname } = response.data.user;

                    console.log(response.data.user)

                    // redux action
                    this.props.onSignIn(email, firstname, lastname);

                    // navigate to App.js
                    this.props.history.push({
                        pathname: "/"
                    });
                
                variant = "success";
                this.props.enqueueSnackbar('Successfully logged in user', { variant });
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
                <div className="image" />
                <Paper className="paper">
                    <img className="signInLogo" src={logo} alt="Elaisa Search Engine Logo"></img>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className="form" noValidate>
                        <TextField
                            onChange={e => this.setState({ email: e.target.value })}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={e => this.setState({ password: e.target.value })}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="secondary" />}
                            label="Remember me"
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
                            Sign In
                        </Button>
                        <Grid container >
                            <Grid item xs>
                                <Link id="link" href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link id="link" href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
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

// redux action
const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, firstname, lastname) => dispatch({type: 'SIGN_IN', email: email, firstname: firstname, lastname: lastname})
    };
};

const SignInSnackBar = withSnackbar(withRouter(connect(null, mapDispatchToProps)(SignIn)));

const IntegrationNotistack = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <SignInSnackBar />
    </SnackbarProvider>
  );
}

export default IntegrationNotistack;

