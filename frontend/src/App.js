import React, { Component } from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import NavigationBar from './components/NavigiationBar/NavigationBar';
import SearchBar from './components/SearchBar/SearchBar';

//logo
import logo from './assets/img/logo.png';

import LangLevelDialog from './components/LangLevelDialog/LangLevelDialog';
import ResultsLanguageDialog from './components/ResultsLanguageDialog/ResultsLanguageDialog';

class App extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <NavigationBar />
        <img src={logo} style={{ width: "20%", marginTop: "5%" }} alt="Pizza"></img>
        <SearchBar />
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
