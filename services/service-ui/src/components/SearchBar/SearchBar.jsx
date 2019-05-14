import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { withRouter } from "react-router-dom";

import DropDownMenu from '../DropDownMenu/DropDownMenu';

// styles 
import styles from '../../assets/jss/SearchBarStyle';
import { Button } from '@material-ui/core';


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

  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      console.log(`Search Query: ${e.target.value}`)

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

  handleChangeLevel = value => {
    console.log(`Level: ${value}`)
    this.setState({ level: value })
  }
  handleChangeLanguage = value => {
    console.log(`Language: ${value}`);
    this.setState({ language: value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={styles.root}>
          <div style={styles.pickers}>
            <DropDownMenu desc="Result Language" items={["Deutsch", "English", "Español"]} values={["de","en","es"]} onChange={e => this.setState({ language: e })} />
            <DropDownMenu desc="Language Level" items={["A1", "A2", "B1", "B2", "C1", "C2"]} values={["A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => this.setState({ level: e })} />
          </div>
          <TextField
            onKeyDown={this.keyPress}
            onChange={e => this.setState({ value: e.target.value })}
            style={styles.margin}
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
            }}
            label="Search for documents in a specific language"
            variant="outlined"
            id="custom-css-outlined-input"
          />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Button id="searchButton" style={styles.searchButton} variant="contained" onClick={this.searchButtonPressed}>Search</Button>
        </div>

      </div>
    );
  }

}


export default withStyles(styles)(withRouter(SearchBar));