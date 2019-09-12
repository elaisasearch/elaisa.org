import React from "react";
// import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 160
  }
});

/**
 * The Dropdown component for choosing language and level in search bar and navigation bar.
 * @param {object} props the given properties.
*/
class DropDownMenu extends React.Component {
  state = {
    pickedData: "",
    name: "",
    labelWidth: 0
  };

  /**
   * Set the label with if the component is loaded.
  */
  componentDidMount() {
    this.setState({
      labelWidth: 120 // ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  /**
   * Change the chosen dropdown value in state.
   * @param {object} event the click event in the dropdown menu.
  */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event.target.value);
  };

  /**
   * Render the dropdown menu as form.
  */
  render() {
    const { classes, items, desc, values } = this.props;

    return (
      <form autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            {desc}
          </InputLabel>
          <Select
            value={this.props.value === undefined ? this.state.pickedData : this.props.value}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="pickedData"
                id="outlined-age-simple"
              />
            }
          >
            {items.map((item, index) => (
              <MenuItem key={index} value={values[index]}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

DropDownMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropDownMenu);
