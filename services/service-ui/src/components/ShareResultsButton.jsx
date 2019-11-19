import React from 'react';
import { Tooltip, Fab } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import HideOnScroll from './HideOnScroll';

const useStyles = makeStyles({
    shareButton: {
        position: 'fixed',
        margin: '0 auto',
        bottom: '3%',
        right: isMobile ? '5%' : '2%'
    }
});

export default function ShareResultsButton(props) {
    const classes = useStyles();

    return (
        <HideOnScroll {...props}>
            <Tooltip title={<Translate id='UI__RESULTS_PAGE__SHARE_BUTTON__TOOLTIP' />}>
                <Fab className={classes.shareButton}>
                    <ShareIcon />
                </Fab>
            </Tooltip>
        </HideOnScroll>
    );
}