import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router-dom";

//import styles
import styles from '../../assets/jss/NavigationBarStyle';

import LeftMenu from '../Menu/LeftMenu';
import SearchBarNavigationBar from '../SearchBar/SearchBarNavigationBar';
import Clock from './Clock';
import Avatars from '../Profile/Avatars';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import logo from '../../assets/img/logo.png';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.values === undefined ? '' : this.props.values[0],
      language: this.props.values === undefined ? '' : this.props.values[1],
      level: this.props.values === undefined ? '' : this.props.values[2]
    }
  }

  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      this.searchButtonPressed()
    }
  }

  searchButtonPressed = () => {
    if (this.state.value.length === 0) {
      alert("Please type in a search value")
    } else if (this.state.level === undefined || this.state.language === undefined || this.state.language.length === 0 || this.state.level.length === 0) {
      alert("Please define your level and a language")
    } else {
      // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
      this.props.history.push({
        pathname: "/results",
        search: `?query=${this.state.value}&level=${this.state.level}&language=${this.state.language}`,
        state: {
          searchValue: this.state.value.toLowerCase(),
          level: this.state.level,
          language: this.state.language
        }
      });
      this.props.click(this.state.value, this.state.level, this.state.language);
    }
  }

  renderAvatar = (props) => {

    // redux state
    const { loggedIn, email, firstname, lastname } = props;

    if (loggedIn) {
      if (email) return <Avatars loggedIn email={email} firstname={firstname} lastname={lastname}/>;
      else return <Avatars firstname={firstname} lastname={lastname}>AT</Avatars>;
    } else {
      return <Avatars/>;
    }
  }

  renderSearchBar = (props) => {
    if (props.results) {
      return <div style={styles.searchBar}>
        <Button href="/" style={styles.elaisaButton}><img src={logo} style={styles.elaisaText} alt="Elaisa Search Engine Logo"></img></Button>
        <SearchBarNavigationBar value={props.values[0]} onChange={e => this.setState({ value: e })} onKeyDown={this.keyPress} />
        <DropDownMenu value={this.state.language} desc="Result Language" items={["Deutsch", "English", "Español"]} values={["de", "en", "es"]} onChange={e => this.setState({ language: e })} />
        <DropDownMenu value={this.state.level} desc="Language Level" items={["A1", "A2", "B1", "B2", "C1", "C2"]} values={["A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => this.setState({ level: e })} />
        <Button style={styles.searchButton} variant="contained" onClick={this.searchButtonPressed}>SEARCH</Button>
      </div>
    }
    return <div style={styles.defaultContent}>
      <Clock />
      {this.renderAvatar(props)}
    </div>;
  }

  renderFilterBar = (props) => {
    if (props.results) {
      return <div style={styles.filterBar}>
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
          {/* {this.renderFilterBar(this.props)} */}
        </AppBar>
      </div>
    );
  }
}

export default withRouter(NavigationBar);