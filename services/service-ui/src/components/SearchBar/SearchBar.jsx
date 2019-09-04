import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton } from '@material-ui/core/'
import { withRouter } from "react-router-dom";
import Search from '@material-ui/icons/Search'
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { Translate } from "react-localize-redux";

// styles 
import styles from '../../assets/jss/SearchBarStyle';
import '../../assets/css/SearchBarStyleCSS.css';

/**
 * The Search Bar component.
 * @param {object} props the given properties.
 * @returns {JSX} Search Bar component.
*/
const SearchBar = (props) => {

  const [value, setValue] = useState('');
  const [level, setLevel] = useState('');
  const [language, setLanguage] = useState('');

  
  /**
   * Checks the user's login data with API post request and stores to redux.
   * @param {event} event the clicked key event
  */
  const keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      searchButtonPressed()
    }
  }

  /**
   * Changes url path after user pressed search button with all information filled in.
  */
  const searchButtonPressed = () => {
    if (value.length === 0) {
      alert("Please type in a search value")
    } else if (level === undefined || language === undefined || language.length === 0 || level.length === 0) {
      alert("Please define your level and a language")
      // handle missing spanish and german articles
    } else if (language === 'de' || language === 'es') {
      alert(`Sorry, but this language isn't supported yet...`)
    } else {
      // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
      props.history.push({
        pathname: "/results",
        // search: `?query=${e.target.value}&level=${level}&language=${language}`,
        search: `?query=${value}&level=${level}&language=${language}`,
        state: {
          searchValue: value.toLowerCase(),
          level: level,
          language: language
        }
      });
    }
  }

  /**
   * Renders JSX content.
   * @returns {JSX} SearchBar.jsx.
  */
  const { classes } = props;
  return (
    <div>
      <div className="seachBarRoot">
        <div style={styles.pickers}>
          <DropDownMenu desc={<Translate id='UI__DROPDOWN__LANGUAGE' />} items={["Deutsch", "English", "Español"]} values={["de", "en", "es"]} onChange={e => setLanguage(e)} />
          <DropDownMenu desc={<Translate id='UI__DROPDOWN__LEVEL' />} items={["A1", "A2", "B1", "B2", "C1", "C2"]} values={["A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => setLevel(e)} />
        </div>
        <TextField
          onKeyDown={keyPress}
          onChange={e => setValue(e.target.value)}
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
                  onClick={searchButtonPressed}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label={<Translate id='UI__SEARCHBAR' />}
          variant="outlined"
          id="custom-css-outlined-input"
        />
      </div>
    </div>
  );
};


export default withStyles(styles)(withRouter(SearchBar));