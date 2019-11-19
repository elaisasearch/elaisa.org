import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import MailIcon from '@material-ui/icons/Mail';
// import SaveIcon from '@material-ui/icons/Save';
// import PrintIcon from '@material-ui/icons/Print';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import { useScrollTrigger, Snackbar, SnackbarContent } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles({
    shareButton: {
        position: 'fixed',
        margin: '0 auto',
        bottom: '3%',
        right: isMobile ? '5%' : '2%'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    success: {
        backgroundColor: green[600],
    }
});

function MySnackbarContentWrapper(props) {
    const { className, message, onClose, variant, ...other } = props;

    const classes = useStyles();

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar">
                    {message}
                </span>
            }
            {...other}
        />
    );
}

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy Link' },
    { icon: <MailIcon />, name: 'Send Mail' },
    // { icon: <PrintIcon />, name: 'Print' },
    // { icon: <ShareIcon />, name: 'Share' },
    // { icon: <FavoriteIcon />, name: 'Like' },
];

export default function ShareResultsButton(props) {

    const { searchValue } = props;

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [copiedLink, setCopiedLink] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const url = window.location.href;

    const trigger = useScrollTrigger({
        target: props.window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackBar = () => {
        setOpenSnackbar(false);
    }

    React.useEffect(() => {
        if (copiedLink) {
            setOpenSnackbar(true);
        }
    }, [copiedLink])

    return (
        <div>
            <SpeedDial
                ariaLabel="sharebutton speed dial menu"
                className={classes.shareButton}
                FabProps={{
                    color: 'default'
                }}
                icon={<ShareIcon />}
                hidden={trigger}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map(action => {

                    switch (action.name) {
                        case 'Copy Link':
                            return (
                                <CopyToClipboard key={action.name} text={url} onCopy={() => setCopiedLink(true)}>
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        tooltipOpen={isMobile ? true : false}
                                        onClick={handleClose}
                                    />
                                </CopyToClipboard>
                            );
                        case 'Send Mail':
                            return <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipOpen={isMobile ? true : false}
                                href={`mailto:?subject=Elaisa Search - ${searchValue}&body=Hi,%0A%0AI want to share this Elaisa Search with you:%0A${url}`}
                            />
                        default:
                            return <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                tooltipOpen={isMobile ? true : false}
                                onClick={handleClose}
                            />
                    }
                })}
            </SpeedDial>
            <Snackbar
                anchorOrigin={{
                    vertical: isMobile ? 'top' : 'bottom',
                    horizontal: isMobile ? 'center' : 'left',
                }}
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackBar}
            >
                <MySnackbarContentWrapper
                    variant="success"
                    message="Copied link!"
                />
            </Snackbar>
        </div>

    );
}