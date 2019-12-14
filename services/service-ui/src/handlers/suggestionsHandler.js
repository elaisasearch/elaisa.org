import axios from 'axios';

/**
 * Fetches all words from the inverted index by API call to store them into redux.
 * They are needed for the autocompletion in the search textfield.
 * @param {Store} store `The Redux Store`
 */
export default function getWords(store) {
    // Get all words from inverted index for auto suggestions
    axios.get('https://api.elaisa.org/getwords')
        .then((response) => {
            store.dispatch({ type: 'SET_WORDS', words: response.data.result });
        }).catch(() => {
            store.dispatch({ type: 'SET_WORDS', words: [] });
        })
}