import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/WikiCardTemplateStyle.css';

/**
 * The Wikipedia Card Template component.
 * @param {object} props the given properties.
 * @returns {JSX} Wikipedia Card Template component with design.
*/
const  WikiCardTemplate = (props) => {
  const { url, title, summary } = props;

  return (
    <Card id="card">
      <CardContent>
        <Typography id="title" color="textSecondary" gutterBottom>
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

export default WikiCardTemplate;