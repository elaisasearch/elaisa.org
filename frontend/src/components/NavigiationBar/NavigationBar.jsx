import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//import styles
import styles from '../../assets/jss/NavigationBarStyle';
import LeftMenu from '../Menu/LeftMenu';
import SearchBarNavigationBar from '../SearchBar/SearchBarNavigationBar';

const NavigationBar = (props) => {

  const renderSearchBar = (props) => {
    if (props.results) {
      return <SearchBarNavigationBar/>
    }
  }

  return (
    <div style={styles.root}>
      <AppBar position="static" id="navBar" style={styles.appBar}>
        <Toolbar>
          <div>
            <LeftMenu/>
          </div>
          {renderSearchBar(props)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;