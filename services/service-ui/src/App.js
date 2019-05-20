import React, { Component } from 'react';
import NavigationBar from './components/NavigiationBar/NavigationBar';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './assets/jss/AppStyle'

//logo
import logo from './assets/img/logo.png';

class App extends Component {

  render() {
    return (
      <div style={styles.app}>
        <NavigationBar/>
        <img id="logo" src={logo} style={styles.logo} alt="Pizza"></img>
        <SearchBar/>
      </div>
    );
  }
}

export default App;
