import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//import styles
import styles from '../../assets/jss/NavigationBarStyle';

const NavigationBar = (props) => {

  return (
    <div style={styles.root}>
      <AppBar position="static" id="navBar" style={styles.appBar}>
        <Toolbar>
          <IconButton style={styles.menu} aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;