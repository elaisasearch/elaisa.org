import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// styles 
import styles from '../../assets/jss/SearchBarStyle';


class SearchBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchValue: ''
    }
  }

  keyPress = (e) => {
    // get the input when user cliks enter (13)
    if(e.keyCode === 13){
      console.log(e.target.value)
       this.setState({
         searchValue: e.target.value
       })
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

export default withStyles(styles)(SearchBar);