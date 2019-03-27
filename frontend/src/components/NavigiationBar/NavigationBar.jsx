import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//import styles
import styles from '../../assets/jss/NavigationBarStyle';
import LeftMenu from '../Menu/LeftMenu';

const NavigationBar = (props) => {

  return (
    <div style={styles.root}>
      <AppBar position="static" id="navBar" style={styles.appBar}>
        <Toolbar>
          <div>
            <LeftMenu/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;