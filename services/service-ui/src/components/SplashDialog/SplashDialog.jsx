import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slide, Typography, IconButton, Dialog, Button, Divider } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import logo from '../../assets/img/logo.png';
import { Translate } from 'react-localize-redux';

// Slide in the Splash Dialog (from bottom to top)
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    root: {
        margin: 0,
        padding: '2vh',
    },
    closeButton: {
        position: 'absolute',
        right: '1vh',
        top: '1vh',
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: '2vh',
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: '2vh',
    },
}))(MuiDialogActions);

export default function SplashDialog(props) {

    const { open, handleClose } = props;

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                TransitionComponent={Transition}
                scroll='paper'
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Translate id='UI__SPLASH_SCREEN__TITLE' />
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography paragraph variant='subheading'>
                        <Translate id='UI__SPLASH_SCREEN__WELCOME_MESSAGE' />
                    </Typography>
                    <Typography paragraph variant='caption'>
                        <Translate id='UI__SPLASH_SCREEN__CAPTION' />
                    </Typography>
                    <Typography gutterBottom>
                        <ol>
                            <li><Translate id='UI__SPLASH_SCREEN__FIRST_LIST_POINT' /></li>
                            <li><Translate id='UI__SPLASH_SCREEN__SECOND_LIST_POINT' /></li>
                            <li><Translate id='UI__SPLASH_SCREEN__THIRD_LIST_POINT' /></li>
                            <li><Translate id='UI__SPLASH_SCREEN__FOURTH_LIST_POINT' /></li>
                        </ol>
                    </Typography>
                    <Typography paragraph variant='caption'>
                        <Translate id='UI__SPLASH_SCREEN__EXAMPLE' /> <br />
                        <ul>
                            <li><Translate id='UI__SPLASH_SCREEN__EXAMPLE_FIRST_LIST_POINT' /></li>
                            <li><Translate id='UI__SPLASH_SCREEN__EXAMPLE_SECOND_LIST_POINT' /></li>
                            <li><Translate id='UI__SPLASH_SCREEN__EXAMPLE_THIRD_LIST_POINT' /></li>
                        </ul>
                    </Typography>
                    <Typography gutterBottom>
                        <b><Translate id='UI__SPLASH_SCREEN__IMPORTANT_NOTICE__TITLE' /></b><br />
                        <Translate id='UI__SPLASH_SCREEN__IMPORTANT_NOTICE__TEXT' />
                    </Typography>

                    <br />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2vh'
                    }}>
                        <Typography gutterBottom style={{ textAlign: 'center' }}>
                            <b><Translate id='UI__SPLASH_SCREEN__HAVE_FUN' /></b><br />
                        </Typography>
                        <img src={logo} alt='logo' width='30%' />
                    </div>

                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={
                        () => window.open('https://github.com/dasmemeteam/language-level-search-engine/blob/master/docs/README.md', '_blank')
                    } color="primary">
                        <Translate id='UI__SPLASH_SCREEN__MORE_INFOS__BUTTON' />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
