import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { withRouter } from "react-router-dom";

// dialogs
import LangLevelDialog from '../../components/LangLevelDialog/LangLevelDialog';
import ResultsLanguageDialog from '../../components/ResultsLanguageDialog/ResultsLanguageDialog';


// styles 
import styles from '../../assets/jss/SearchBarStyle';


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
      if (e.target.value.length === 0) {
        alert("Please type in a search value")
      } else if (this.state.level === undefined || this.state.language === undefined || this.state.language.length === 0 || this.state.level.length === 0) {
        alert("Please define your level and a language")
      } else {
        // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
        this.props.history.push({
          pathname: "/results",
          search: `?query=${e.target.value}&level=${this.state.level}&language=${this.state.language}`,
          state: { 
            searchValue: e.target.value,
            level: this.state.level,
            language: this.state.language
          }
        });
      }
    }
  }

  handleChangeLevel = value => {
    console.log(`Level: ${value}`)
    this.setState({level: value})
  }
  handleChangeLanguage = value => {
    console.log(`Language: ${value}`);
    this.setState({language: value})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={styles.root}>
          <TextField
            onKeyDown={this.keyPress}
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
          <LangLevelDialog onClose={e => this.handleChangeLevel(e)}/>
          <ResultsLanguageDialog onClose={e => this.handleChangeLanguage(e)}/>
        </div>
        
      </div>
    );
  }

}


export default withStyles(styles)(withRouter(SearchBar));