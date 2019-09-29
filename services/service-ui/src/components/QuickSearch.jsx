import React from 'react';
import '../assets/css/QuickSearchStyle.css';
import { connect } from 'react-redux';

/**
 * In maps you have to use a key for each element
 * source: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
 */

const QuickSearchContainer = (props) => {

    const { topics, setQuickSearch } = props;

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