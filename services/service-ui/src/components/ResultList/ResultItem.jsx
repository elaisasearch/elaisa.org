import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import '../../assets/css/ResultItemStyle.css'
import LevelPanel from './LevelPanel';

/**
 * The Result Item component to show each result.
 * @param {object} props the given properties.
 * @return {JSX} Result item component.
*/
const ResultItem = (props) => {

    const { website, title, desc, keywords, date, language, level, level_meta } = props;

    /**
     * Result Item Title.
     * @return {JSX} title with link to article.
    */
    const Title = () => {
        return <a href={website}>{title}</a>
    }

    return (
        <ListItem id="listItemRoot">
            <div id="levelDiv">{level}</div>
            <div>
                <Title />
                <ListItemText
                    id="listItem"
                    secondary={
                        <React.Fragment>
                            <Typography component="span" id="date">
                                {/* TODO: only shows the english date */}
                                {moment(date).locale(language).format('LLLL') === "Invalid date" ? "" : moment(date).locale(language).format('LLL')}
                            </Typography>
                            <Typography component="span" id="subtitle">
                                {website}
                            </Typography>
                            {desc}
                            <Typography component="span" id="keywords">
                                {keywords}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <div>
                    <LevelPanel level_meta={level_meta} />
                </div>
            </div>
        </ListItem>
    )
}

export default ResultItem;