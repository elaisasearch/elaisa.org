import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import styles from '../../assets/jss/ResultItemStyle'
import LevelPanel from './LevelPanel';

const ResultItem = (props) => {

    const { website, title, desc, keywords, date, language, level, level_meta } = props;

    const Title = () => {
        return <a href={website} style={styles.title}>{title}</a>
    }



    return (
        <ListItem style={styles}>
            <div style={styles.levelDiv}>{level}</div>
            <div>
                <Title />
                <ListItemText
                    style={styles.listItem}
                    secondary={
                        <React.Fragment>
                            <Typography component="span" style={styles.date}>
                                {/* TODO: only shows the english date */}
                                {moment(date).locale(language).format('LLLL') === "Invalid date" ? "" : moment(date).locale(language).format('LLL')}
                            </Typography>
                            <Typography component="span" style={styles.subtitle}>
                                {website}
                            </Typography>
                            {desc}
                            <Typography component="span" style={styles.keywords}>
                                {keywords}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <div style={{marginTop: "1.5%"}}>
                    <LevelPanel level_meta={level_meta} />
                </div>
            </div>
        </ListItem>
    )
}

export default ResultItem;