import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '7%',
    marginTop: '4%'
  },
//   inline: {
//     display: 'inline',
//   },
});

class ResultList{

    consructor(props){
        super(props)

    }

    render(){
        const { classes } = this.props;
        return (
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        );
    }

}

ResultList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResultList);
