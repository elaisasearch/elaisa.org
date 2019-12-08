import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import './assets/css/index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core/styles';

// theme
import { theme } from './assets/theme';

// views
import App from './views/App';
import Results from './views/Results';
import Page404 from './views/Page404';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Account from './views/Account';
import Profile from './views/Profile';
import TranslationWrapper from './TranslationWrapper';
import Bookmarks from './views/Bookmarks';

// reducer 
import reducer from './store/reducer';



// Build the browser history
var hist = createBrowserHistory();

// create redux store
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// set localStorage default values
// only show splash dialog window one time
if (localStorage.getItem('splashDialogWasOpen') !== 'true') localStorage.setItem('splashDialogWasOpen', false);

// Get all words from inverted index for auto suggestions
axios.get('https://api.elaisa.org/getwords')
    .then((response) => {
        store.dispatch({ type: 'SET_WORDS', words: response.data.result });
    }).catch(() => {
        store.dispatch({ type: 'SET_WORDS', words: [] });
    })

// Get user loggedIn state from localStorage
try {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const { loggedIn, email, firstname, lastname } = userLocalStorage;
    if (loggedIn) {
        store.dispatch({ type: 'SIGN_IN', email: email, firstname: firstname, lastname: lastname });
    }
} catch (error) {
    // store the default state to localStorage if 'user' is undefined in localStorage
    localStorage.setItem('user', JSON.stringify({
        loggedIn: false,
        email: "frodo.beutlin@hobbits.com",
        firstname: "Frodo",
        lastname: "Beutlin",
    }));
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <LocalizeProvider>
                <TranslationWrapper>
                    <Router history={hist}>
                        <Switch>
                            <Route path='/bookmarks' component={Bookmarks} />
                            <Route path='/profile' component={Profile} />
                            <Route path='/account' component={Account} />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/signin' component={SignIn} />
                            <Route path='/results' component={Results} />
                            <Route path='/' exact component={App} />
                            <Route component={Page404} />
                        </Switch>
                    </Router>
                </TranslationWrapper>
            </LocalizeProvider>
        </ThemeProvider>

    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
