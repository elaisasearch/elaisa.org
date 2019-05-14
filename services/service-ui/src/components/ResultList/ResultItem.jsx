import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import moment from 'moment';

const styles = {
    display: 'flex',
    marginBottom: '1%',
    subtitle: {
        color: 'green'
    },
    title: {
    },
    levelDiv: {
        border: '1px solid black',
        padding: '1vh',
        borderRadius: '100%',
        marginRight: '2vh'
    },
    listItem: {
        padding: 0,
        marginTop: '0.5vh'
    },
    keywords: {
        color: 'blue',
        fontSize: '12px'
    },
    date: {
        fontSize: '12px'
    }

}

const ResultItem = (props) => {

    const { website, title, desc, keywords, date, language, level } = props
    console.log("Locale", language)

    console.log("Level: ", level );

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
            </div>
        </ListItem>
    )
}

export default ResultItem;