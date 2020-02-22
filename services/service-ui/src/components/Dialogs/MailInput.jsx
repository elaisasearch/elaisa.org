import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import axios from 'axios';
import globals from '../../globals.json';
import { makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles({
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonWrapper: {
        position: 'relative',
    }
});

const MailInput = (props) => {

    const [email, setEmail] = useState('');
    const [showResponseMessage, setShowResponseMessage] = useState(false);
    const [responseMessageVariant, setResponseMessageVariant] = useState();
    const [loading, setLoading] = React.useState(false);

    const { open, handleClose } = props;

    const classes = useStyles();

    /**
     * Send the new password mail and close the dialog
     */
    const handleSendPassword = () => {

        // If the user input isn't a valid email address, show the error message.
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setShowResponseMessage(true)
            setResponseMessageVariant('error')
            return
        }

        setLoading(true);

        axios.post(`https://api.elaisa.org/forgotpassword?email=${email}&key=${globals['api']['x-api-key']}`, {}
        ).then((response) => {

            setLoading(false);
            
            switch (response.data.result.message) {
                case 'success':
                    setShowResponseMessage(true)
                    setResponseMessageVariant('success')
                    setTimeout(() => {
                        handleClose();
                    }, 2000)
                    break;
                case 'Mail not found':
                    setShowResponseMessage(true)
                    setResponseMessageVariant('mail not found')
                    break;
                default:
                    setShowResponseMessage(true)
                    setResponseMessageVariant('error')
                    return;
            }
        }).catch((error) => {
            setShowResponseMessage(true)
            setResponseMessageVariant('error')
        })
    }

    const renderResponseMessage = () => {
        if (showResponseMessage) {
            if (responseMessageVariant === 'success') {
                return <Typography variant='caption' style={{color: 'green'}} ><Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__RESPONSE_MESSAGE_SUCCESS' /></Typography>
            } else if (responseMessageVariant === 'mail not found') {
                return <Typography variant='caption' style={{color: 'red'}}><Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__RESPONSE_MESSAGE_MAIL_NOT_FOUND' /></Typography>
            } else if (responseMessageVariant === 'error') {
                return <Typography variant='caption' style={{color: 'red'}}><Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__RESPONSE_MESSAGE_ERROR' /></Typography>
            }
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__TITLE' /></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__CONTENT' />
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                />
                {renderResponseMessage()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__CANCEL_BUTTON' />
                </Button>
                <div className={classes.buttonWrapper}>
                    <Button onClick={handleSendPassword} color="primary" disabled={loading || email.length === 0}>
                        <Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__SUBMIT_BUTTON' />
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default MailInput;

