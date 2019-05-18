import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigiationBar/NavigationBar';
import SearchBar from './components/SearchBar/SearchBar';

//logo
import logo from './assets/img/logo.png';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <img id="logo" src={logo} style={{ width: "15%", marginTop: "5%" }} alt="Pizza"></img>
        <SearchBar/>
      </div>
    );
  }
}

export default App;
