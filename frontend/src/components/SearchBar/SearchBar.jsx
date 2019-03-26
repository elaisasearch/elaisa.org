import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// styles 
import styles from '../../assets/jss/SearchBarStyle';


const SearchBar = (props) => {
  const { classes } = props;

  return (
    <div style={styles.root}>
      <TextField
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

export default withStyles(styles)(SearchBar);