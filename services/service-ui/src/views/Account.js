import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../components/NavigationBar';
import '../assets/css/AccountStyle.css';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, withSnackbar } from 'notistack';
import axios from 'axios';
// redux
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import HeaderTags from '../components/HeaderTags';

/**
 * Account view class.
 * @param {object} props the given properties.
 * @returns {JSX} account view jsx components.
*/
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
        let variant = "";

        axios.post(`https://api.elaisa.org/changepassword?oldpassword=${this.state.oldPass}&newpassword=${this.state.newPass}&email=${email}`, {})
            .then((response) => {
                if (response.data === "Success") {
                    variant = "success";
                    this.props.enqueueSnackbar('Successfully changed password', { variant });
                } else {
                    variant = "error";
                    this.props.enqueueSnackbar('The old password is wrong', { variant });
                }
            }).catch((error) => {
                variant = "error";
                this.props.enqueueSnackbar(error.message, { variant });
            });
    }

    render() {

        const { loggedIn, email, firstname, lastname } = this.props;

        return <div>
            <HeaderTags 
             title="Elaisa Search Engine - Account"
             desc="Visit your account and change your password"
             keywords="Account, Password"
            />
            <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
            <Divider />
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
                            <Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD' />
                    </Typography>
                        <div className="passwordTextfieldsDiv">
                            <TextField
                                onChange={e => this.setState({ oldPass: e.target.value })}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label={<Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__OLD_PASSWORD' />}
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
                                label={<Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__NEW_PASSWORD' />}
                                type="password"
                                id="newPassword"
                                style={{ margin: "3%" }}
                            />
                        </div>
                        <Button variant="contained" onClick={e => this.handleChangeButton(email)}>
                            <Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__BUTTON' />
                    </Button>
                    </div>

                </Paper>
            </div>
        </div>
    }
}

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} the props containing the redux state.
*/
const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        email: state.email,
        firstname: state.firstname,
        lastname: state.lastname
    };
};

const AccountSnackBar = withSnackbar(connect(mapStateToProps)(Account));

/**
 * Adds Notification Snack Bar.
 * @returns {JSX} the Account View Snack Bar Integration.
*/
const AccountIntegrationNotistack = () => {
    return (
        <SnackbarProvider maxSnack={3}>
            <AccountSnackBar />
        </SnackbarProvider>
    );
};

export default AccountIntegrationNotistack;

