import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import '../assets/css/AppStyle.css'
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import scrollToFooter from '../handlers/scrollHandler';

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

  // redux state
  const { loggedIn, email, firstname, lastname } = props;

  return (
    <div className="root">
      <div className="app">
        <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
        <img id="logo" src={logo} className="logo" alt="Elaisa Search Engine Logo"></img>
        <SearchBar />
      </div>
      <IconButton onClick={ e => scrollToFooter("content1")} aria-label="show-footer" id="show-footer-button" size="large">
          <ArrowDownwardIcon fontSize="large" />
        </IconButton>
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
    lastname: state.lastname
  };
};

export default connect(mapStateToProps)(App);


