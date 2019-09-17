import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Translate } from 'react-localize-redux';
import axios from 'axios';


const MailInput = (props) => {

    const [email, setEmail] = useState();
    const [showResponseMessage, setShowResponseMessage] = useState(false);
    const [responseMessageVariant, setResponseMessageVariant] = useState();

    const { open, handleClose } = props;

    /**
     * Send the new password mail and close the dialog
     */
    const handleSendPassword = () => {

        axios.post(`http://api.elaisa.org/forgotpassword?email=${email}`, {}
        ).then((response) => {
            switch (response.data) {
                case 'Success':
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
            console.log(error)
        })
    }

    const renderResponseMessage = () => {
        if (showResponseMessage) {
            if (responseMessageVariant === 'success') {
                return <Typography variant='caption' style={{color: 'green'}} >Successfully changed the password.</Typography>
            } else if (responseMessageVariant === 'mail not found') {
                return <Typography variant='caption' style={{color: 'red'}}>The provided mail wasn't found. Please try again with another mail.</Typography>
            } else if (responseMessageVariant === 'error') {
                return <Typography variant='caption' style={{color: 'red'}}>Sorry but there was an error. Please try again later.</Typography>
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
                <Button onClick={handleSendPassword} color="primary">
                    <Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__SUBMIT_BUTTON' />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MailInput;

