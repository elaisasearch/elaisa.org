import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core/';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Translate } from 'react-localize-redux';
import { makeStyles } from '@material-ui/styles';

import scrollToFooter from '../handlers/scrollHandler';

const useStyles = makeStyles({
    footerButton: {
        position: 'absolute !important',
        left: '0',
        right: '0',
        marginLeft: 'auto !important',
        marginRight: 'auto !important',
        bottom: '5vh',
        width: '100%'
    }
});

const ShowFooterButton = () => {
    const classes = useStyles();

    // disable the show footer button if it was clicked one time to prevent hight bug in the footer.
    // when the user wants to the see footer, he has to scroll down manually
    const [disableShowFooterButton, setDisableShowFooterButton] = useState(false);

    return <Tooltip title={<Translate id='UI__BUTTON__SHOW_FOOTER__TOOLTIP' />} aria-label='show-more-information'>
        <IconButton className={classes.footerButton} onClick={e => { scrollToFooter(); setDisableShowFooterButton(true) }} disabled={disableShowFooterButton} aria-label="show-footer" size="large">
            <ArrowDownwardIcon fontSize="large" />
        </IconButton>
    </Tooltip>
}

export default ShowFooterButton;