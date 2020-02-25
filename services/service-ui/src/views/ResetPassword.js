import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { Grid, Button, TextField, Typography, Paper, CircularProgress } from '@material-ui/core/';
import { SnackbarProvider, withSnackbar } from 'notistack';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import HeaderTags from '../components/HeaderTags';
import { makeStyles, withTheme } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import globals from '../globals.json';
import { green } from '@material-ui/core/colors';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    accountRoot: theme => ({
        background: theme.palette.background.default,
        minHeight: '100vh'
    }),
    resetView: {
        marginTop: isMobile ? '10%' : '2%',
        height: isMobile ? '70vh' : null
    },
    resetPaper: {
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? '100%' : '50vh',
        width: isMobile ? '100%' : '50vw',
        alignItems: 'center',
        boxShadow: isMobile ? 'none' : null
        
    },
    resetTitle: {
        marginTop: '10%'
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
const ResetPassword = (props) => {

    const [newPassSecond, setNewPassSecond] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const { theme } = props;

    // Get the passwordToken from URL
    const { passwordToken } = useParams();

    const classes = useStyles(theme);

    const handleChangeButton = () => {
        let variant = "";

        setLoading(true);

        axios.post(`https://api.elaisa.org/resetpassword?newpassword=${newPass}&email=''&key=${globals['api']['x-api-key']}`, {})
            .then((response) => {
                const { data } = response;
                const { result } = data;
                const { email, message } = result;

                setLoading(false);

                if (message === 'success') {
                    variant = message;
                    props.enqueueSnackbar(`Successfully changed password for ${email}`, { variant });
                } else {
                    variant = 'error';
                    props.enqueueSnackbar(`The old password is incorrect. If you don't know your password anymore, logout and reset it.`, { variant });
                }
            })
            .catch((error) => {
                variant = "error";
                props.enqueueSnackbar('The old password is wrong', { variant });

                setLoading(false);
            })
    }


    return <div className={classes.accountRoot}>
        <HeaderTags
            title="Elaisa Search Engine - Account"
            desc="Reset your password"
            keywords="Account, Password, Reset"
        />
        <NavigationBar loggedIn={false} />
        <Divider />
        <Grid container direction='column' alignItems='center' className={classes.resetView}>
            <Paper className={classes.resetPaper}>
                <Typography variant="h3" color="textSecondary" component="h3" className={classes.resetTitle}>
                    <Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD' />
                </Typography>
                <Grid 
                    container  
                    className={classes.passwordDiv}
                    direction='column'
                    alignItems='center'
                >
                    <div className={classes.passwordTextfieldsDiv}>
                        <TextField
                            onChange={e => setNewPass(e.target.value)}
                            variant="outlined"
                            required
                            name="password"
                            label={<Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__NEW_PASSWORD' />}
                            type="password"
                            id="newPasswordSecond"
                            autoComplete="current-password"
                            style={{ margin: "3%" }}
                        />
                        <TextField
                            onChange={e => setNewPassSecond(e.target.value)}
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
                        <Button variant="contained" onClick={e => handleChangeButton()} disabled={loading || newPass !== newPassSecond || newPass.length === 0 || newPassSecond.length === 0}>
                            <Translate id='UI__USER__ACCOUNT_PAGE__CHANGE_PASSWORD__BUTTON' />
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </Grid>

            </Paper>
        </Grid>
    </div>
}

const ResetPasswordSnackBar = withSnackbar(withTheme(ResetPassword));

/**
 * Adds Notification Snack Bar.
 * @returns {JSX} the Account View Snack Bar Integration.
*/
const AccountIntegrationNotistack = () => {
    return (
        <SnackbarProvider maxSnack={3}>
            <ResetPasswordSnackBar />
        </SnackbarProvider>
    );
};

export default AccountIntegrationNotistack;

