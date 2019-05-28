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

import axios from 'axios';

import '../assets/css/SignInStyle.css'
import logo from '../assets/img/logo.png';

class SignIn extends Component {

    state = {
        email: "",
        password: "",
    }

    handleSignIn = () => {
        console.log(this.state);
        
        axios.post('http://localhost:8080/signin', {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            params: {
                email: this.state.email,
                password: this.state.password
            }
        }).then((response) => {
            console.log("SUCCEEEEEES")
        }).catch((error) => {
            console.log("ERRRRROR")
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
                            disabled={this.state.email.length === 0 || this.state.password.length === 0}
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

export default SignIn;

