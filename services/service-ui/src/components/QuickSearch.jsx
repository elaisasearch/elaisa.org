import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { Grid, Typography, Button } from '@material-ui/core';
import ChooseQuickSearchValueDialog from './ChooseQuickSearchValueDialog';
import { makeStyles } from '@material-ui/styles';
import { Translate } from 'react-localize-redux';
import { withTheme } from '@material-ui/core/styles';


const useStyles = makeStyles({
    quickSearchButton: theme => ({
        padding: '3%',
        borderRadius: '30px',
        border: '1px solid',
        borderColor: theme.palette.type === 'dark' ? 'rgb(255,255,255,0.3)' : theme.palette.borderColor,
        '&:hover': {
            border: '1px solid',
            borderColor: theme.palette.borderColor
        },
        background: 'transparent',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        cursor: 'pointer',
        fontSize: '1rem',
        color: theme.palette.text.secondary,
        marginRight: '2%',
    }),
    or: {
        marginBottom: '10%'
    }
})


/**
 * In maps you have to use a key for each element
 * source: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
 */

const QuickSearchContainer = (props) => {

    const { topics, setQuickSearch, theme } = props;
    const classes = useStyles(theme);

    // handle open state for dialog
    const [open, setOpen] = useState(false);

    const handleClose = (value, quickSearch) => {
        setOpen(false);
        setQuickSearch(value, quickSearch);
    };

    // Only used on mobile devices
    const handleOpenQuickReplyCard = () => {
        setOpen(true);
    }

    return (
        <Grid
            item
            xs='auto'
            style={{
                marginTop: isMobile ? '5%' : '2%',
            }}
        >
            <Typography color='textSecondary' classes={{root: classes.or}}>
                <Translate id='UI__DIALOG__QUICK_SEARCH_OR' />
            </Typography>
            <Button className={classes.quickSearchButton} onClick={handleOpenQuickReplyCard}>
                <Translate id='UI__DIALOG__QUICK_SEARCH' />
            </Button>
            <ChooseQuickSearchValueDialog topics={topics} open={open} onClose={handleClose} />
        </Grid>
    );
}

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
    return {
        topics: state.topics,
    };
};

/**
 * Maps redux signIn action to props.
* @param {object} dispatch the current redux store.
* @returns {any} redux action to props mapping.
   */
const mapDispatchToProps = dispatch => {
    return {
        setQuickSearch: (value, quickSearch) => dispatch({ type: 'SET_QUICK_SEARCH', value, quickSearch })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(QuickSearchContainer));