import React from 'react';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useScrollTrigger } from '@material-ui/core';


const useStyles = makeStyles({
    shareButton: {
        position: 'fixed',
        margin: '0 auto',
        bottom: '3%',
        right: isMobile ? '5%' : '2%'
    }
});

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy Link' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
];

export default function ShareResultsButton(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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

    return (
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
            {actions.map(action => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen={isMobile ? true : false}
                    onClick={handleClose}
                />
            ))}
        </SpeedDial>
    );
}