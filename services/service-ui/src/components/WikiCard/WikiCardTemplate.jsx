import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Translate } from 'react-localize-redux';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';


const useStyles = makeStyles({
  card: {
    minWidth: isMobile ? '100%' : '275px',
    maxWidth: isMobile ? '100%' : '275px',
    marginTop: isMobile ? '5%' : '4vh',
    marginRight: isMobile ? 'auto' : '10vh',
    marginLeft: 'auto',
    boxShadow: isMobile ? 'none !important' : null,
    maxHeight: !isMobile ? '330px' : null
  },
  wikitextP: {
    textAlign: 'justify',
    lineHeight: '1.5 !important'
  },
  title: {
    fontSize: '14'
  },
  wikiTitleDiv: {
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important'
  },
  enlargeFontSizeButton: {
    display: isMobile ? 'inline' : 'none !important'
  },
  showMoreLessButton: {
    display: isMobile ? 'inline' : 'none',
    background: 'none !important',
    border: 'none',
    padding: '0 !important',
    fontSize: '14px',
    color: '#069',
    cursor: 'pointer',
  }
});


/**
 * The Wikipedia Card Template component.
 * @param {object} props the given properties.
 * @returns {JSX} Wikipedia Card Template component with design.
*/
const  WikiCardTemplate = (props) => {
  const { url, title, summary } = props;
  const classes = useStyles();

  const [fullWikiText, setFullWikiText] = useState(false);

  /**
   * Enlarge the font size of the wikipedia text if it is too small for the user's eyes.
   */
  const handleChangeFontSize = () => {
    let p = document.getElementById('wikitext');
    let computedStyle = window.getComputedStyle ? getComputedStyle(p) : p.currentStyle;
    let fontSize;

    if (computedStyle) {
      fontSize = parseFloat(computedStyle && computedStyle.fontSize);
      fontSize += 2;

      if (fontSize > 24) {
        p.style.fontSize = 14 + 'px';
      } else {
        p.style.fontSize = fontSize + 'px';
      }
    }
  }

  /**
   * Render the Wikipedia text in full or short length
   */
  const showWikiText = () => {
    if (fullWikiText) {
      return <p className={classes.wikitextP} id='wikitext'>
        {summary} <button className={classes.showMoreLessButton} onClick={(e) => setFullWikiText(false)}><Translate id='UI__RESULTS_PAGE__WIKIPEDIA__LESS_TEXT_BUTTON' /></button>
      </p>
    } else {
      return <span id='wikitext'>{summary.slice(0,250)}... <button className={classes.showMoreLessButton} onClick={(e) => setFullWikiText(true)}><Translate id='UI__RESULTS_PAGE__WIKIPEDIA__MORE_TEXT_BUTTON' /></button></span>
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Wikipedia
        </Typography>
        <Typography variant="h5" component="div" className={classes.wikiTitleDiv}>
          {title}
          <IconButton onClick={handleChangeFontSize} className={classes.enlargeFontSizeButton}>
            <TextFormatIcon size='medium'/>
          </IconButton>
        </Typography>
        <br/>
        <Typography variant='body2' component="p" className={classes.wikitextP}>
          {showWikiText()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={url} target='_blank'><Translate id='UI__RESULTS_PAGE__WIKIPEDIA__MORE_BUTTON' /></Button>
      </CardActions>
    </Card>
  );
}

export default WikiCardTemplate;