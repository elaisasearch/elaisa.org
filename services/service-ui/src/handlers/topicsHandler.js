import axios from 'axios';

/**
 * Fetches random topics from Elaisa API for QuickSearch feature.
 * @param {Store} store `The Redux Store`
 */
export default function getTopics(store) {
    // Get three topics for the quick search feature
    axios.get('https://api.elaisa.org/gettopics?number=3')
        .then((res) => {
            store.dispatch({ type: 'SET_TOPICS', topics: res.data.result.topics });
        }).catch(() => {
            store.dispatch({
                type: 'SET_TOPICS', topics: [
                    {
                        "topic": "Pavkov",
                        "documents_count": 32
                    },
                    {
                        "topic": "Tottenham",
                        "documents_count": 33
                    },
                    {
                        "topic": "Eriksen",
                        "documents_count": 30
                    }
                ]
            });
        })
}