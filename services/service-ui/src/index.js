import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import './assets/css/index.css';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';

// views
import App from './views/App';
import Results from './views/Results';
import Page404 from './views/Page404';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Account from './views/Account';
import Profile from './views/Profile';

// reducer 
import reducer from './store/reducer';


// Build the browser history
var hist = createBrowserHistory();

// create redux store
const store = createStore(reducer);

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/account' component={Account} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/results' component={Results} />
            <Route path='/' exact component={App} />
            <Route component={Page404} />
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
