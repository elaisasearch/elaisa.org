import React, { useState } from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import '../assets/css/AppStyle.css'
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import scrollToFooter from '../handlers/scrollHandler';
import SplashDialog from '../components/SplashDialog/SplashDialog';

// logo
import logo from '../assets/img/logo.png';
// redux 
import { connect } from 'react-redux';

/**
 * This is the search engines main function.
 * @param {object} props the given properties.
 * @returns {JSX} returns the search engine's home view components.
 */
const App = (props) => {

  // handle the splash dialog open state
  const [splashDialogOpen, setSplashDialogOpen] = useState(false);

  const handleClose = () => {
    setSplashDialogOpen(false);
  }

  // redux state
  const { loggedIn, email, firstname, lastname, onOpenedSplashDialog, splashDialogWasOpen } = props;

  // open the splash screen after 3 seconds if it wasn't already open
  setTimeout(
    () => {
      if (splashDialogWasOpen === false) {
        onOpenedSplashDialog()
        setSplashDialogOpen(true);
      }
    }
    , 3000
  );

  return (
    <div className="root">
      <SplashDialog open={splashDialogOpen} handleClose={handleClose} />
      <div className="app">
        <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
        <img id="logo" src={logo} className="logo" alt="Elaisa Search Engine Logo"></img>
        <SearchBar />
        <IconButton onClick={e => scrollToFooter()} aria-label="show-footer" id="show-footer-button" size="large">
          <ArrowDownwardIcon fontSize="large" />
        </IconButton>
      </div>
      <Footer />
    </div>
  );
}

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    email: state.email,
    firstname: state.firstname,
    lastname: state.lastname,
    splashDialogWasOpen: state.splashDialogWasOpen
  };
};

/**
 * Maps redux signIn action to props.
 * @param {object} dispatch the current redux store.
 * @returns {any} redux action to props mapping.
*/
const mapDispatchToProps = dispatch => {
  return {
    onOpenedSplashDialog: () => dispatch({ type: 'OPENED_SPLASH' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


