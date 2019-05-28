import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import '../assets/css/AccountStyle.css';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';

class Account extends Component {

    state = {
        oldPass: "",
        newPass: ""
    }

    renderAvatar = (email, firstname, lastname) => {
        if (email) {
            return <Gravatar email={email} size={100} />
        } else if (firstname && lastname) {
            return `${firstname.slice(0, 1)}${lastname.slice(0, 1)}`
        }
        return <Person />
    }

    handleChangeButton = (email) => {
        console.log(this.state);

        axios.post(`http://localhost:8080/changepassword?oldpassword=${this.state.oldPass}&newpassword=${this.state.newPass}&email=${email}`, {})
        .then((response) => {
            if (response.data === "Success") {
                console.log("changed password");
                this.props.history.push({
                    pathname: "/",
                    state: {
                        email: this.state.email,
                        loggedIn: true
                    }
                });
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        const { email, firstname, lastname } = this.props.location.state;

        return <div>
            <NavigationBar />
            <div className="accountView">
                <Paper className="accountPaper">
                    <Avatar alt={firstname} id="accountLogo">
                        {this.renderAvatar(email, firstname, lastname)}
                    </Avatar>
                    <Typography variant="h3" color="textSecondary" component="h3" id="accountName">
                        {firstname} {lastname}
                    </Typography>
                    <Typography variant="h5" color="textSecondary" id="accountEmail">
                        {email}
                    </Typography>
                    <div className="passwordDiv">
                        <Typography variant="h6" color="textSecondary" id="accountEmail">
                            Change your Password
                    </Typography>
                        <div className="passwordTextfieldsDiv">
                            <TextField
                                onChange={e => this.setState({ oldPass: e.target.value })}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Old Password"
                                type="password"
                                id="oldPassword"
                                autoComplete="current-password"
                                style={{ margin: "3%" }}
                            />
                            <TextField
                                onChange={e => this.setState({ newPass: e.target.value })}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                style={{ margin: "3%" }}
                            />
                        </div>
                        <Button variant="contained" onClick={e => this.handleChangeButton(email)}>
                            Change
                    </Button>
                    </div>

                </Paper>
            </div>
        </div>
    }
}

export default Account;