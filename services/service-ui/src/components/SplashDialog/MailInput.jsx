import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Translate } from 'react-localize-redux';
import axios from 'axios';


const MailInput = (props) => {

    const [email, setEmail] = useState();

    const { open, handleClose } = props;

    /**
     * Send the new password mail and close the dialog
     */
    const handleSendPassword = () => {

        axios.post(`http://localhost:8080/forgotpassword?email=${email}`, {}
        ).then((response) => {
            handleClose()
        }).catch((error) => {
            console.log(error)
        })
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

