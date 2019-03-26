import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigiationBar/NavigationBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
      </div>
    );
  }
}

export default App;
