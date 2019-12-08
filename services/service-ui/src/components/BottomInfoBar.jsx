import React from 'react';
import { Button, Grid, IconButton } from '@material-ui/core/';
import { Translate } from "react-localize-redux";
import LanguageSelect from './LanguageSelect';
import LegalNoticeDialog from './Dialogs/LegalNoticeDialog';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import GetAppIcon from '@material-ui/icons/GetApp';
import { withTheme } from '@material-ui/styles';

const useStyles = makeStyles({
    infoBar: theme => ({
        overflow: 'auto',
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: 0,
        background: theme.palette.type === 'dark' ? theme.palette.background.paper : 'rgb(239,239,239)',
        paddingLeft: isMobile ? '3vh' : '0',
        borderTop: theme.palette.type === 'light' ? '0.8px solid lightgrey' : null
    }),
    legalNoticeButton: {
        fontSize: '60% !important',
        marginRight: isMobile ? 0 : '5vh !important',
        marginLeft: isMobile ? 0 : '3vh !important',
        position: isMobile ? 'absolute !important' : 'inline',
        right: isMobile ? '3vh' : '1vh'
    }
});

const BottomInfoBar = (props) => {

    const { theme } = props;
    const classes = useStyles(theme);
    const [legalNoticeDialogOpen, setLegalNoticeDialogOpen] = React.useState(false);

    const handleCloseLegalNoticeDialog = () => {
        setLegalNoticeDialogOpen(false);
    }

    const handleAddToHomescreenClick = () => {
        const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (iOS) {
            alert(`
            1. Open Share menu
            2. Tap on "Add to Home Screen"`
          );
        } else {
            alert(`
            1. Tap on the browser menu button
            2. Tap on "Add to Home Screen"`
          );
        }
      };

    return (
        <Grid
            className={classes.infoBar}
            container
            alignItems='center'
            justify={isMobile ? 'flex-start' : 'flex-end'}
        >
            <LegalNoticeDialog open={legalNoticeDialogOpen} handleClose={handleCloseLegalNoticeDialog} />
            <LanguageSelect />
            {
                isMobile
                ?
                <IconButton onClick={handleAddToHomescreenClick}>
                    <GetAppIcon />
                </IconButton>
                :
                null
            }
            <Button className={classes.legalNoticeButton} onClick={e => setLegalNoticeDialogOpen(true)}>
                <Translate id='UI__BUTTON__LEGAL' />
            </Button>
        </Grid>
    );
};


export default withTheme(BottomInfoBar);