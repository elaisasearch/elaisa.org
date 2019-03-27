import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigiationBar/NavigationBar';
import SearchBar from './components/SearchBar/SearchBar';

//logo
import logo from './assets/img/logo.png';

import LangLevelDialog from './components/LangLevelDialog/LangLevelDialog';
import ResultsLanguageDialog from './components/ResultsLanguageDialog/ResultsLanguageDialog';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <img src={logo} style={{ width: "20%", marginTop: "5%" }} alt="Pizza"></img>
        <SearchBar/>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <LangLevelDialog />
          <ResultsLanguageDialog />
        </div>
      </div>
    );
  }
}

export default App;
