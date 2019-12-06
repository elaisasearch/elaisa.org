import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton } from '@material-ui/core/'
import { withRouter, Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Translate } from 'react-localize-redux';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

//import styles
import styles from '../assets/jss/NavigationBarStyle';


import LeftMenu from './Menu/LeftMenu';
import SearchBarNavigationBar from './SearchBar/SearchBarNavigationBar';
import Avatars from './Profile/Avatars';
import DropDownMenu from './DropDownMenu';
import logo from '../assets/img/logo.png';
import SearchDialog from '../components/Dialogs/SearchDialog';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.values === undefined ? '' : this.props.values[0],
      language: this.props.values === undefined ? '' : this.props.values[1],
      level: this.props.values === undefined ? '' : this.props.values[2],
      openSearchDialog: false
    }
  }

  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      this.searchButtonPressed()
    }
  }

  /**
   * Search Dialog handler functions
   */
  handleClickedOpenSearchDialog = () => {
    this.setState({
      openSearchDialog: true
    })
  }

  handleClickedCloseSearchDialog = () => {
    this.setState({
      openSearchDialog: false
    })
  }

  /**
   * Start a new Search when user changes parameters via Search Dialog on 
   * mobile devices
   */
  handleChangedSearchParamsInDialog = async (level, language) => {
    await this.setState({
      language: language,
      level: level,
      openSearchDialog: false
    })

    await this.searchButtonPressed();
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
      if (email) return <Avatars loggedIn email={email} firstname={firstname} lastname={lastname} />;
      else return <Avatars firstname={firstname} lastname={lastname}>AT</Avatars>;
    } else {
      return <Avatars />;
    }
  }

  renderSearchBar = (props) => {
    if (props.results) {
      if (isMobile) {
        return (
          <Grid
            container
            justify='space-between'
            alignItems='center'
          >
            <Grid
              item
              justify='flex-start'
            >
              <IconButton style={{color: 'black'}} onClick={this.handleClickedOpenSearchDialog}>
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              justify='flex-end'
            >
              <Button component={Link} to="/" style={styles.elaisaButton}><img src={logo} style={styles.elaisaText} alt="Elaisa Search Engine Logo"></img></Button>
            </Grid>
          </Grid>
        );
      } else {
        return <Grid
          container
          justify='center'
        >
          <Button disableRipple component={Link} to="/" style={styles.elaisaButton}><img src={logo} style={styles.elaisaText} alt="Elaisa Search Engine Logo"></img></Button>
          <SearchBarNavigationBar handleClickSearch={this.searchButtonPressed} value={props.values[0]} onChange={e => this.setState({ value: e })} onKeyDown={this.keyPress} />
          <DropDownMenu value={this.state.language} desc={<Translate id='UI__DROPDOWN__LANGUAGE' />} items={["D̶e̶u̶t̶s̶c̶h̶", "English", "E̶s̶p̶a̶ñ̶o̶l̶"]} values={["de", "en", "es"]} onChange={e => this.setState({ language: e })} />
          <DropDownMenu value={this.state.level} desc={<Translate id='UI__DROPDOWN__LEVEL' />} items={[<Translate id='UI__DROPDOWN__LEVEL_ALL' />, "A1", "A2", "B1", "B2", "C1", "C2"]} values={["all", "A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => this.setState({ level: e })} />
        </Grid>
      }
    }
    return <Grid
      container
      direction='column'
      alignItems='flex-end'
    >
      {this.renderAvatar(props)}
    </Grid>;
  }

  render() {
    return (
      <AppBar
        position="static"
        id="navBar"
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          width: '100%',
          marginTop: isMobile ? '5%' : null
        }}
      >
        <Toolbar>
          <LeftMenu />
          {this.renderSearchBar(this.props)}
        </Toolbar>
        <SearchDialog open={this.state.openSearchDialog} handleClose={this.handleClickedCloseSearchDialog} level={this.state.level} language={this.state.language} value={this.props.values[0]} handleChange={this.handleChangedSearchParamsInDialog}/>
      </AppBar>
    );
  }
}

export default withRouter(NavigationBar);