import React, { useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core/';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Translate } from 'react-localize-redux';

import scrollToFooter from '../handlers/scrollHandler';


const ShowFooterButton = () => {

    // disable the show footer button if it was clicked one time to prevent hight bug in the footer.
    // when the user wants to the see footer, he has to scroll down manually
    const [disableShowFooterButton, setDisableShowFooterButton] = useState(false)

    return <Tooltip title={<Translate id='UI__BUTTON__SHOW_FOOTER__TOOLTIP' />} aria-label='show-more-information'>
        <IconButton onClick={e => { scrollToFooter(); setDisableShowFooterButton(true) }} disabled={disableShowFooterButton} aria-label="show-footer" id="show-footer-button" size="large">
            <ArrowDownwardIcon fontSize="large" />
        </IconButton>
    </Tooltip>
}

export default ShowFooterButton;