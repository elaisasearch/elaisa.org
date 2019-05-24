import React, { Component } from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import SearchBar from '../components/SearchBar/SearchBar';
import Footer from '../components/Footer/Footer';
import '../assets/css/AppStyle.css'

//logo
import logo from '../assets/img/logo.png';

class App extends Component {

  render() {
    return (
      <div className="root">
        <div className="app">
          <NavigationBar />
          <img id="logo" src={logo} className="logo" alt="Elaisa Search Engine Logo"></img>
          <SearchBar />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;


