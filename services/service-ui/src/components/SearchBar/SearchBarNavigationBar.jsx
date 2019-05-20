import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// styles 
import styles from '../../assets/jss/SearchBarNavigationBarStyle';


const SearchBar = (props) => {

    const { classes, value } = props;

    const handleChange = (e) => {
        props.onChange(e.target.value);
    }

    const handleKeyDown = (e) => {
        props.onKeyDown(e);
    }

    return (
        <div style={styles.root}>
            <TextField
                onKeyDown={e => handleKeyDown(e)}
                onChange={e => handleChange(e)}
                id="outlined-full-width"
                style={{ margin: 8, borderColor: "grey" }}
                placeholder="Search for documents"
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={value}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                    },
                }}
            />
        </div>
    );
}

export default withStyles(styles)(SearchBar);