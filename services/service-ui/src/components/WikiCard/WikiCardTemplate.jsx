import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/WikiCardTemplateStyle.css';
import { Translate } from 'react-localize-redux';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import { IconButton } from '@material-ui/core';


/**
 * The Wikipedia Card Template component.
 * @param {object} props the given properties.
 * @returns {JSX} Wikipedia Card Template component with design.
*/
const  WikiCardTemplate = (props) => {
  const { url, title, summary } = props;

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
      return <p className='wikitext-p' id='wikitext'>
        {summary}
        <button className='show-more-less-button' onClick={(e) => setFullWikiText(false)}><Translate id='UI__RESULTS_PAGE__WIKIPEDIA__LESS_TEXT_BUTTON' /></button>
      </p>
    } else {
      return <p className='wikitext-p' id='wikitext'>{summary.slice(0,200)}... <button className='show-more-less-button' onClick={(e) => setFullWikiText(true)}><Translate id='UI__RESULTS_PAGE__WIKIPEDIA__MORE_TEXT_BUTTON' /></button></p>
    }
  }

  return (
    <Card id="card">
      <CardContent>
        <Typography id="title" color="textSecondary" gutterBottom>
          Wikipedia
        </Typography>
        <Typography variant="h5" component="div" id='wiki-title-div'>
          {title}
          <IconButton onClick={handleChangeFontSize} id='enlarge-font-size-button'>
            <TextFormatIcon size='medium'/>
          </IconButton>
        </Typography>
        <br/>
        <Typography component="p">
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