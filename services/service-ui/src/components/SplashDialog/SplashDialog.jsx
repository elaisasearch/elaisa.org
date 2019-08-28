import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slide, Typography, IconButton, Dialog, Button, Divider } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import logo from '../../assets/img/logo.png';

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
                    How to use Elaisa?
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography paragraph variant='caption'>
                        You can search for articles and documents in the langauges Spanish, German and English. To only get the best articles for you, specify your current level of speaking for each langauge.
                    </Typography>
                    <Typography gutterBottom>
                        <ol>
                            <li>Choose a language</li>
                            <li>Choose a level</li>
                            <li>Type in a search term</li>
                            <li>Click on the search button</li>
                        </ol>
                    </Typography>
                    <Typography paragraph variant='caption'>
                        Eaxample: <br />
                        <ul>
                            <li>Language: English</li>
                            <li>Level: C2</li>
                            <li>Term: summer</li>
                        </ul>
                    </Typography>
                    <Typography gutterBottom>
                        <b>Important!</b><br />
                        You have to define all three fields to search for documents, since they are all dependent on each other.
                    </Typography>

                    <br />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2vh'
                    }}>
                        <Typography gutterBottom style={{ textAlign: 'center' }}>
                            <b>Have fun!</b><br />
                        </Typography>
                        <img src={logo} alt='logo' width='30%' />
                    </div>

                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={
                        () => window.open('https://github.com/dasmemeteam/language-level-search-engine/blob/master/docs/README.md', '_blank')
                    } color="primary">
                        More infos
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
