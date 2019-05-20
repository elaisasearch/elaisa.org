import React from "react";
import ReactDOM from "react-dom";
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

class DropDownMenu extends React.Component {
  state = {
    pickedData: "",
    name: "",
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event.target.value);
  };

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
            value={this.state.pickedData}
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
