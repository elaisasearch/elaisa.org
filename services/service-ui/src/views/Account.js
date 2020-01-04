import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';
import { Avatar, Grid, Button, TextField, Typography, Paper, CircularProgress } from '@material-ui/core/';
import { SnackbarProvider, withSnackbar } from 'notistack';
import axios from 'axios';
// redux
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import HeaderTags from '../components/HeaderTags';
import { makeStyles, withTheme } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import globals from '../globals.json';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    accountRoot: theme => ({
        background: theme.palette.background.default,
        minHeight: '100vh'
    }),
    accountView: {
        marginTop: isMobile ? '10%' : '2%',
        height: isMobile ? '70vh' : null
    },
    accountPaper: {
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100%' : '80vh',
        width: isMobile ? '100%' : '50vw',
        alignItems: 'center',
        boxShadow: isMobile ? 'none' : null
        
    },
    accountLogo: {
        width: '100px',
        height: '100px',
        marginTop: '5%'
    },
    accountName: {
        marginTop: isMobile ? '10%' : '5%'
    },
    accountEmail: {
        marginTop: '2%'
    },
    passwordDiv: {
        marginTop: '10%',
        width: '70%'
    },
    passwordTextfieldsDiv: {
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: !isMobile ? 'center' : null
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonWrapper: theme => ({
        margin: theme.spacing(1),
        position: 'relative',
    })
});

/**
 * Account view.
 * @param {object} props the given properties.
 * @returns {JSX} account view jsx components.
*/
const Account = (props) => {

    const [oldPass, setOldPass] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const { loggedIn, email, firstname, lastname, theme } = props;

    const classes = useStyles(theme);

    const renderAvatar = (email, firstname, lastname) => {
        if (email) {
            return <Gravatar email={email} size={100} />
        } else if (firstname && lastname) {
            return `${firstname.slice(0, 1)}${lastname.slice(0, 1)}`
        }
        return <Person />
    }

    const handleChangeButton = (email) => {
        let variant = "";

        setLoading(true);

        axios.post(`https://api.elaisa.org/changepassword?oldpassword=${oldPass}&newpassword=${newPass}&email=${email}&key=${globals['api']['x-api-key']}`, {})
            .then((response) => {
                const { data } = response;
                const { result } = data;
                const { email, message } = result;

                setLoading(false);

                if (message === 'success') {
                    variant = message;
                    props.enqueueSnackbar(`Successfully changed password for ${email}`, { variant });
                } else {
                    variant = message;
                    props.enqueueSnackbar('The old password is wrong', { variant });
                }
            }).catch((error) => {
                variant = "error";
                props.enqueueSnackbar(error.message, { variant });
            });
    }


    return <div className={classes.accountRoot}>
        <HeaderTags
            title="Elaisa Search Engine - Account"
            desc="Visit your account and change your password"
            keywords="Account, Password"
        />
        <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
        <Divider />
        <Grid container direction='column' alignItems='center' className={classes.accountView}>
            <Paper className={classes.accountPaper}>
                <Avatar alt={firstname} classes={{root: classes.accountLogo}}>
                    {renderAvatar(email, firstname, lastname)}
                </Avatar>
                <Typography variant="h3" color="textSecondary" component="h3" className={classes.accountName}>
                    {firstname} {lastname}
                </Typography>
                <Typography variant="h5" color="textSecondary" className={classes.accountEmail}>
                    {email}
                </Typography>
                <Grid 
                    container  
                    className={classes.passwordDiv}
                    direction='column'
                    alignItems='center'
                >
                    <Typography variant="h6" color="textSecondary" id="accountEmail">
                        <Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD' />
                    </Typography>
                    <div className={classes.passwordTextfieldsDiv}>
                        <TextField
                            onChange={e => setOldPass(e.target.value)}
                            variant="outlined"
                            required
                            name="password"
                            label={<Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__OLD_PASSWORD' />}
                            type="password"
                            id="oldPassword"
                            autoComplete="current-password"
                            style={{ margin: "3%" }}
                        />
                        <TextField
                            onChange={e => setNewPass(e.target.value)}
                            variant="outlined"
                            required
                            name="password"
                            label={<Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__NEW_PASSWORD' />}
                            type="password"
                            id="newPassword"
                            style={{ margin: "3%" }}
                        />
                    </div>
                    <div className={classes.buttonWrapper}>
                        <Button variant="contained" onClick={e => handleChangeButton(email)} disabled={loading || oldPass === newPass || oldPass.length === 0 || newPass.length === 0}>
                            <Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__BUTTON' />
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </Grid>

            </Paper>
        </Grid>
    </div>
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

const AccountSnackBar = withSnackbar(connect(mapStateToProps)(withTheme(Account)));

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

