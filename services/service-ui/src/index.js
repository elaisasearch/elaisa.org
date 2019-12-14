import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import './assets/css/index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';

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
import ThemeWrapper from './ThemeWrapper';

// reducer 
import reducer from './store/reducer';
import getTopics from './handlers/topicsHandler';
import getWords from './handlers/suggestionsHandler';
import getUserLoginState from './handlers/userHandler';



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

// get words and store to redux for autocomplete
getWords(store)

// get topics and store to redux
getTopics(store)

// check if the user is logged in from last session
getUserLoginState(store)

ReactDOM.render(
    <Provider store={store}>
        <ThemeWrapper>
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
        </ThemeWrapper>

    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
