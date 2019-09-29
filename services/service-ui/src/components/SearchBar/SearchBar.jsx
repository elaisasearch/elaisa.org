import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core/'
import { withRouter } from "react-router-dom";
import Search from '@material-ui/icons/Search'
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';

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

  const { quickSearch, quickSearchValue, setQuickSearch } = props;


  /**
   * Check if the user clicked a quick search button and start searching if true.
  */
  useEffect(() => {

    // If quickSearch is true, set the values and trigger a new effect
    if (quickSearch && value.length === 0) {
      setValue(quickSearchValue);
      setLevel('all');
      setLanguage('en')
    }

    // If the values for quick search are set, use the new effect and start the search
    if (quickSearchValue.length > 0 && value.length > 0) {
      searchButtonPressed()
      // Set back the quick search values to prevent auto quicksearch when user navigates back to home.
      setQuickSearch('', false);
    }
  });

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
          searchValue: value,
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
          <DropDownMenu desc={<Translate id='UI__DROPDOWN__LEVEL' />} items={[<Translate id='UI__DROPDOWN__LEVEL_ALL' />, "A1", "A2", "B1", "B2", "C1", "C2"]} values={["all", "A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => setLevel(e)} />
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
                <Tooltip title={<Translate id='UI__SEARCHBAR' />} aria-label='search'>
                  <IconButton
                    edge="end"
                    aria-label="toggle search"
                    onClick={searchButtonPressed}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
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

/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} returns the props containing the redux state.
 */
const mapStateToProps = state => {
  return {
    quickSearch: state.quickSearch,
    quickSearchValue: state.quickSearchValue
  };
};

/**
 * Maps redux signIn action to props.
 * @param {object} dispatch the current redux store.
 * @returns {any} redux action to props mapping.
*/
const mapDispatchToProps = dispatch => {
  return {
    setQuickSearch: (value, quickSearch) => dispatch({ type: 'SET_QUICK_SEARCH', value, quickSearch })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(SearchBar)));