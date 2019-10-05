import React, { useState } from 'react';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core/';
import { isMobile } from 'react-device-detect';

import NavigationBar from '../components/NavigiationBar/NavigationBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import SplashDialog from '../components/SplashDialog/SplashDialog';
import LegalNoticeDialog from '../components/SplashDialog/LegalNoticeDialog';
import LanguageSelect from '../components/LanguageSelect';
import HeaderTags from '../components/HeaderTags';
import QuickSearch from '../components/QuickSearch';
import ShowFooterButton from '../components/ShowFooterButton';

import '../assets/css/AppStyle.css'
import logo from '../assets/img/logo.png';

/**
 * This is the search engines main function.
 * @param {object} props the given properties.
 * @returns {JSX} returns the search engine's home view components.
 */
const App = (props) => {

  // handle the splash dialog open state
  const [splashDialogOpen, setSplashDialogOpen] = useState(false);
  const [legalNoticeDialogOpen, setLegalNoticeDialogOpen] = useState(false);

  const handleClose = () => {
    setSplashDialogOpen(false);
  }

  const handleCloseLegalNoticeDialog = () => {
    setLegalNoticeDialogOpen(false);
  }

  // redux state
  const { loggedIn, email, firstname, lastname, onOpenedSplashDialog, splashDialogWasOpen } = props;

  // open the splash screen after 3 seconds if it wasn't already open
  setTimeout(
    () => {
      if (splashDialogWasOpen === false && localStorage.getItem('splashDialogWasOpen') === 'false') {
        onOpenedSplashDialog(true)
        setSplashDialogOpen(true);
        localStorage.setItem('splashDialogWasOpen', true)
      }
    }
    , 1500
  );

  return (
    <div 
      style={{
        textAlign: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <HeaderTags 
        title="Elaisa Search Engine - Home"
        desc="Language level search engine for finding documents in a specific language with a specific language level"
        keywords="Home"
      />
      <SplashDialog open={splashDialogOpen} handleClose={handleClose} />
      <LegalNoticeDialog open={legalNoticeDialogOpen} handleClose={handleCloseLegalNoticeDialog} />
      
      <Grid 
        container 
        direction= 'column'
        alignItems= 'center'
        style={{
          height: '100%'
        }}
      >
        <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
        <img 
          id="logo" 
          src={logo} 
          alt="Elaisa Search Engine Logo"
          style={{
            width: isMobile ? '50%' : '20%',
            marginTop: isMobile ? '15%' : '10%'
          }}
        ></img>
        <SearchBar />
        <QuickSearch topics={['Donald Trump', 'music', 'sport']}/>
        <ShowFooterButton />
        <div className='legal-info'>
          <LanguageSelect />
          <Button id='legal-notice-button' onClick={e => setLegalNoticeDialogOpen(true)}>
            <Translate id='UI__BUTTON__LEGAL' />
          </Button>
        </div>
      </Grid>
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
    onOpenedSplashDialog: (opened) => dispatch({ type: 'OPENED_SPLASH', opened })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


