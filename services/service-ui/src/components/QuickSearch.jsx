import React, { useState } from 'react';
import '../assets/css/QuickSearchStyle.css';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import TimerIcon from '@material-ui/icons/Timer';
import { IconButton } from '@material-ui/core';
import ChooseQuickSearchValueDialog from './ChooseQuickSearchValueDialog';


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
            return <div className='quicksearch-container'>
                <IconButton onClick={handleOpenQuickReplyCard}>
                    <TimerIcon fontSize='large'/>
                </IconButton>
                <ChooseQuickSearchValueDialog topics={topics} open={open} onClose={handleClose} />
            </div>
        } else {
            return <div className='quicksearch-container'>
                {topics.map(topic => {
                    return (
                        <button
                        key={topic}
                        className='quicksearch-button'
                        onClick={e => setQuickSearch(topic, true)}
                    >
                        {topic}
                    </button>
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