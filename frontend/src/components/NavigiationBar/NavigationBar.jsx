import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

//import styles
import styles from '../../assets/jss/NavigationBarStyle';
import LeftMenu from '../Menu/LeftMenu';
import SearchBarNavigationBar from '../SearchBar/SearchBarNavigationBar';

import DropDownMenu from '../DropDownMenu/DropDownMenu';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      level: '',
      language: ''
    }
  }

  renderSearchBar = (props) => {
    const searchValue = props.value
    if (props.results) {
      return <div style={{display: "flex", flexGrow: 1}}>
        <SearchBarNavigationBar value={searchValue}/>
        <DropDownMenu desc="Result Language" items={["Deutsch", "English", "Español"]} onChange={e => this.setState({ language: e })} />
        <DropDownMenu desc="Language Level" items={["A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => this.setState({ level: e })} />
      </div>
    }
  }

  renderFilterBar = (props) => {
    if (props.results) {
      return <div style={{ marginLeft: "9vh", padding: "1vh" }}>
        <Button>All</Button>
        <Button>News</Button>
        <Button>Blogs</Button>
      </div>
    }
  }

  render() {
    return (

      <div style={styles.root}>
        <AppBar position="static" id="navBar" style={styles.appBar}>
          <Toolbar>
            <div>
              <LeftMenu />
            </div>
            {this.renderSearchBar(this.props)}
          </Toolbar>
          {this.renderFilterBar(this.props)}
        </AppBar>
      </div>
    );
  }
}

export default NavigationBar;