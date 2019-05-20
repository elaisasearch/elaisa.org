import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class SwitchLabels extends React.Component {
  state = {
    darkmode: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    try {
        if (!this.state.darkmode) {
            document.body.style.background = "#484848";
            document.getElementById("navBar").style.backgroundColor = "#282828";
            document.getElementById("searchButton").style.backgroundColor = "#282828";
            document.getElementById("searchButton").style.color = "lightgrey";
            document.getElementById("logo").style.filter = "grayscale(100%)";
            document.getElementById("menuButton").style.color = "lightgrey";
        }else{
            document.body.style.background = "white";
            document.getElementById("navBar").style.backgroundColor = "white";
            document.getElementById("searchButton").style.backgroundColor = "lightgrey";
            document.getElementById("searchButton").style.color = "black";
            document.getElementById("logo").style.filter = "grayscale(0%)";
            document.getElementById("menuButton").style.color = "black";
        }
    } catch (error) {}
  };

  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.darkmode}
              onChange={this.handleChange('darkmode')}
              value="darkmode"
              color="primary"
            />
          }
        />
    
      </FormGroup>
    );
  }
}

export default SwitchLabels;
