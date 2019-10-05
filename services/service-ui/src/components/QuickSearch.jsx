import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import TimerIcon from '@material-ui/icons/Timer';
import { IconButton } from '@material-ui/core';
import ChooseQuickSearchValueDialog from './ChooseQuickSearchValueDialog';
import { styled } from '@material-ui/styles';

const QuickSearchButton = styled('button')({
    padding: '1%',
    borderRadius: '30px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    '&:hover': {
        border: '1px solid black'
    },
    background: 'transparent',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    cursor: 'pointer',
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: '2%',
})


/**
 * In maps you have to use a key for each element
 * source: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
 */

const QuickSearchContainer = (props) => {

    const { topics, setQuickSearch } = props;

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

    const renderQuickSearch = () => {
        if (isMobile) {
            return <div style={{marginTop: '5%'}}>
                <IconButton onClick={handleOpenQuickReplyCard}>
                    <TimerIcon fontSize='large'/>
                </IconButton>
                <ChooseQuickSearchValueDialog topics={topics} open={open} onClose={handleClose} />
            </div>
        } else {
            return <div style={{marginTop: '2%', width: '100%'}}>
                {topics.map(topic => {
                    return (
                        <QuickSearchButton
                        key={topic}
                        onClick={e => setQuickSearch(topic, true)}
                    >
                        {topic}
                    </QuickSearchButton>
                    );
                })}
            </div>;

        }
    }

    return renderQuickSearch();
}

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

export default connect(null, mapDispatchToProps)(QuickSearchContainer);