import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core'

const styles = {
    display: 'flex',
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
    }

}

const ResultItem = (props) => {

    const { website, title, desc } = props

    const Title = () => {
        return <a href={website} style={styles.title}>{title}</a>
    }

    return (

        <ListItem style={styles}>
            <div style={styles.levelDiv}>C1</div>
            <div>
                <Title />
                <ListItemText
                    style={styles.listItem}
                    //   primary={title}
                    component="a"
                    secondary={
                        <React.Fragment>
                            <Typography component="span" style={styles.subtitle}>
                                {website}
                            </Typography>
                            {desc}
                        </React.Fragment>
                    }
                />
            </div>
        </ListItem>
    )
}

export default ResultItem;