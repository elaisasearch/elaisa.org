import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// styles 
import styles from '../../assets/jss/SearchBarNavigationBarStyle';


class SearchBar extends React.Component {

    handleChange = (e) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (e) => {
        this.props.onKeyDown(e);
    }

    render() {
        const { classes, value } = this.props;
        return (
            <div style={styles.root}>
                <TextField
                    onKeyDown={e => this.handleKeyDown(e)}
                    onChange={e => this.handleChange(e)}
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
}

export default withStyles(styles)(SearchBar);