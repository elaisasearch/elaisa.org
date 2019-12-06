import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Translate } from 'react-localize-redux';
import DropDownMenu from '../DropDownMenu';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        flexGrow:1
    },
    cssLabel: {
      '&$cssFocused': {
        color: "grey",
      }
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        border: '1px solid black'
      },
    },
    notchedOutline: {},
    contentRoot: {
        textAlign: 'center'
    }
});

const SearchDialog = (props) => {

    const [level, setLevel] = useState(props.level);
    const [language, setLanguage] = useState(props.language);
    const [value, setValue] = useState(props.value);

    const { open, handleClose, handleChange } = props;

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><Translate id='UI__RESULTS_PAGE__SEARCH_DIALOG__TITLE' /></DialogTitle>
            <DialogContent classes={{root: classes.contentRoot}}>
                <DropDownMenu value={language} desc={<Translate id='UI__DROPDOWN__LANGUAGE' />} items={["D̶e̶u̶t̶s̶c̶h̶", "English", "E̶s̶p̶a̶ñ̶o̶l̶"]} values={["de", "en", "es"]} onChange={e => setLanguage(e)} />
                <DropDownMenu value={level} desc={<Translate id='UI__DROPDOWN__LEVEL' />} items={[<Translate id='UI__DROPDOWN__LEVEL_ALL' />, "A1", "A2", "B1", "B2", "C1", "C2"]} values={["all", "A1", "A2", "B1", "B2", "C1", "C2"]} onChange={e => setLevel(e)} />
                <TextField
                    onChange={e => setValue(e)}
                    id="outlined-full-width"
                    style={{ borderColor: "grey" }}
                    label={<Translate id='UI__SEARCHBAR' />}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    defaultValue={value}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <Translate id='UI__SIGN_IN_PAGE__DIALOG_MAIL_INPUT__CANCEL_BUTTON' />
                </Button>
                <Button onClick={e => handleChange(level, language)} color="primary">
                    <Translate id='UI__RESULTS_PAGE__SEARCH_DIALOG__BUTTON' />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SearchDialog;

