import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import { withRouter } from "react-router-dom";


// styles 
import styles from '../../assets/jss/SearchBarStyle';


class SearchBar extends React.Component {

  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if (e.keyCode === 13) {
      console.log(e.target.value)
      if (e.target.value.length === 0) {
        alert("Please type in a search value")
      } else {
        // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-link-redirect-in-react-router-v4
        this.props.history.push({
          pathname: "/results",
          search: `?query=${e.target.value}`,
          state: {searchValue: e.target.value}
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
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
    );
  }

}


export default withStyles(styles)(withRouter(SearchBar));