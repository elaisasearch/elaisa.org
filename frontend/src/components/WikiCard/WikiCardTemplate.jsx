import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 275,
    maxHeight: 280,
    marginTop: '6vh',
    marginRight: '10vh'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function WikiCardTemplate(props) {
  const { classes } = props;
  const { url, title, summary } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Wikipedia
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <br/>
        <Typography component="p">
          {summary.slice(0,200)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={url} target='_blank'>Learn More</Button>
      </CardActions>
    </Card>
  );
}

WikiCardTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WikiCardTemplate);