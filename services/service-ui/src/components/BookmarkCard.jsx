import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/Delete';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import LevelInfo from '../components/ResultList/LevelInfo';
import { deleteBookmark } from '../handlers/bookmarksHelper';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    marginBottom: '10%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: {
    fontSize: 20
  },
  infoContent: {
    paddingLeft: '7%',
    paddingRight: '7%'
  }
}));

const BookmarkCard = (props) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { bookmark, setDeleted } = props;
  const { website, title, desc, keywords, level_meta, level } = bookmark;


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(website)
    setDeleted(true)
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="open" href={website}>
            <OpenInNewIcon />
          </IconButton>
        }
        classes={{
          title: classes.title
        }}
        title={title}
        subheader={null}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {desc}
          <br />
          <br />
          {keywords}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="delete" onClick={handleDeleteBookmark}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <FitnessCenterIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          classes={{
            root: classes.infoContent
          }}
        >
          <LevelInfo level={level} level_meta={level_meta} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default BookmarkCard
