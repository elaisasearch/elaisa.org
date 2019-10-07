import React from "react";
import { Typography, Grid, Fab } from "@material-ui/core";
import { Translate } from 'react-localize-redux';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import ExposureZeroIcon from '@material-ui/icons/ExposureZero';



const useStyles = makeStyles({
    notFoundRoot: {
        marginTop: '2%'
    },
    notFoundIcon: {
        fontSize: isMobile ? '100vw !important' : '50vw !important',
        color: 'rgb(0, 0, 0, 0.1)',
        position: !isMobile ? 'fixed' : ''
    },
    notFoundTitle: {
        textAlign: isMobile ? 'center' : ''
    },
    spelling: {
        position: 'absolute !important',
        left: 0,
        right: 0,
        bottom: '2%',
        margin: 'auto !important'
    }
});

/**
 * The not found component for the Results view.
 * @param {object} props the given properties
 * @returns {JSX} Error text and image.
*/
const NotFound = (props) => {

    const { level, language, correctSpelledQuery, onClickSpellCheck } = props;
    const classes = useStyles();

    return (
        <Grid
            container
            direction='column'
            alignItems='center'
            className={classes.notFoundRoot}
        >
            <Typography variant="caption">
                <Translate id='UI__NOT_FOUND_PAGE__ADVICE_ONE' /> <b>{level}</b> <Translate id='UI__NOT_FOUND_PAGE__ADVICE_TWO' /> <b>{language.toUpperCase()}</b>
            </Typography>
            <ExposureZeroIcon className={classes.notFoundIcon} />
            {
                (correctSpelledQuery.length > 0)
                    ?
                    <Fab variant="extended" aria-label="spelling" className={classes.spelling} onClick={onClickSpellCheck}>
                        <Translate id='UI__NOT_FOUND_PAGE__CORRECTION' /> "<b>{correctSpelledQuery}</b>?".
                    </Fab>
                    :
                    null
            }
        </Grid>

    );
}

export default NotFound;