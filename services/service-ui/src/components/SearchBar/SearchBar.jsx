import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from '@material-ui/core/'
import { withRouter } from "react-router-dom";
import Search from '@material-ui/icons/Search'

import DropDownMenu from '../DropDownMenu/DropDownMenu';

// styles 
import styles from '../../assets/jss/SearchBarStyle';
import '../../assets/css/SearchBarStyleCSS.css';
import { Button } from '@material-ui/core';

/**
 * The Search Bar component.
 * @param {object} props the given properties.
 * @returns {JSX} Search Bar component.
*/
class SearchBar extends React.Component {

  constructor(props) {
    super();
    this.state = {
      open: false,
      value: '',
      level: '',
      language: ''
    };
  }

  /**
   * Checks the user's login data with API post request and stores to redux.
   * @param {event} event the clicked key event
  */
  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      this.searchButtonPressed()
    }
  }

  /**
   * Changes url path after user pressed search button with all information filled in.
  */
  searchButtonPressed = () => {
    if (this.state.value.length === 0) {
      alert("Please type in a search value")
    } else if (this.state.level === undefined || this.state.language === undefined || this.state.language.length === 0 || this.state.level.length === 0) {
      alert("Please define your level and a language")
    } else {
      // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
      this.props.history.push({
        pathname: "/results",
        // search: `?query=${e.target.value}&level=${this.state.level}&language=${this.state.language}`,
        search: `?query=${this.state.value}&level=${this.state.level}&language=${this.state.language}`,
        state: {
          searchValue: this.state.value.toLowerCase(),
          level: this.state.level,
          language: this.state.language
        }
      });
    }
  }

  /**
   * Updates state when user changes level dropdown menu.
   * @param {string} value the dropdown level value.
  */
  handleChangeLevel = value => {
    this.setState({ level: value })
  }

  /**
   * Updates state when user changes language dropdown menu.
   * @param {string} value the dropdown language value.
  */
  handleChangeLanguage = value => {
    this.setState({ language: value });
  }

  /**
   * Renders JSX content.
   * @returns {JSX} SearchBar.jsx.
  */
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="seachBarRoot">
          <div style={styles.pickers}>
            <DropDownMenu desc="Result Language" items={["Deutsch", "English", "Español"]} values={["de", "en", "es"]} onChange={e => this.setState({ language: e })} />
            <DropDownMenu desc="Language Level" items={["A1", "A2", "B1", "B2", "C1", "C2"]} values={["A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => this.setState({ level: e })} />
          </div>
          <TextField
            autoFocus
            onKeyDown={this.keyPress}
            onChange={e => this.setState({ value: e.target.value })}
            //style={styles.margin}
            className="bar"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle search"
                    onClick={this.searchButtonPressed}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Search for documents in a specific language"
            variant="outlined"
            id="custom-css-outlined-input"
          />
        </div>
      </div>
    );
  }

}


export default withStyles(styles)(withRouter(SearchBar));