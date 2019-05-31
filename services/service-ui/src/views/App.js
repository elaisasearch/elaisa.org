import React, { Component } from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import '../assets/css/AppStyle.css'
// logo
import logo from '../assets/img/logo.png';
// redux 
import { connect } from 'react-redux';

class App extends Component {

  render() {

    // redux state
    const { loggedIn, email, firstname, lastname } = this.props;

    return (
      <div className="root">
        <div className="app">
          <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname}/>
          <img id="logo" src={logo} className="logo" alt="Elaisa Search Engine Logo"></img>
          <SearchBar />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      loggedIn: state.loggedIn,
      email: state.email,
      firstname: state.firstname,
      lastname: state.lastname
  };
};

export default connect(mapStateToProps)(App);


