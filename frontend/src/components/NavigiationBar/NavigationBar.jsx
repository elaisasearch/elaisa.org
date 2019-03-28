import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

//import styles
import styles from '../../assets/jss/NavigationBarStyle';
import LeftMenu from '../Menu/LeftMenu';
import SearchBarNavigationBar from '../SearchBar/SearchBarNavigationBar';

import DropDownMenu from '../DropDownMenu/DropDownMenu';

const NavigationBar = (props) => {

  const renderSearchBar = (props) => {
    const searchValue = props.value
    if (props.results) {
      return <div style={{display: "flex", flexGrow: 1}}>
        <SearchBarNavigationBar value={searchValue}/>
        <DropDownMenu desc="Result Language" items={["Deutsch", "English", "Español"]} />
        <DropDownMenu desc="Language Level" items={["A1", "A2", "B1", "B2", "C1", "C2"]} />
      </div>
    }
  }

  const renderFilterBar = (props) => {
    if (props.results) {
      return <div style={{ marginLeft: "9vh", padding: "1vh" }}>
        <Button>All</Button>
        <Button>News</Button>
        <Button>Blogs</Button>
      </div>
    }
  }

  return (

    <div style={styles.root}>
      <AppBar position="static" id="navBar" style={styles.appBar}>
        <Toolbar>
          <div>
            <LeftMenu />
          </div>
          {renderSearchBar(props)}
        </Toolbar>
        {renderFilterBar(props)}
      </AppBar>
    </div>
  );
}

export default NavigationBar;