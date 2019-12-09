import React from 'react';
import PieChart from '../components/Profile/charts/PieChart';
import NavigationBar from '../components/NavigationBar';
import { connect } from 'react-redux';
import { Paper, Typography, Divider, Grid } from '@material-ui/core';
import EnhancedTable from '../components/Profile/table/EnhancedTable';
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import PDFGenerator from '../components/Profile/PDF/index';
import { Translate } from 'react-localize-redux';
import HeaderTags from '../components/HeaderTags';
import { makeStyles, withTheme } from '@material-ui/styles';
import { isMobile } from 'react-device-detect';
import globals from '../globals.json';


const useStyles = makeStyles({
    profileRoot: theme => ({
        background: theme.palette.background.default
    }),
    profileContent: {
        marginTop: '3%',
        justifyContent: 'space-around !important'
    },
    currentLevelContent: {
        width: isMobile ? '90%' : '35%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '3%': '1%',
        marginBottom: isMobile ? '5%' : '2%'
    },
    currentLanguageContent: {
        width: isMobile ? '90%' : '35%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '3%': '1%',
        marginBottom: isMobile ? '5%' : '2%'
    },
    contentPaper1: {
        width: isMobile ? '90%' : '35%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1%',
        marginBottom: isMobile ? '5%' : null
    },
    contentPaper2: {
        width: isMobile ? '90%' : '35%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1%',
        marginBottom: isMobile ? '5%' : null
    },
    contentTable: {
        display: 'flex',
        justifyContent: 'center',
    },
    pdfButton: {
        paddingBottom: '5%',
        marginTop: '5%'
    }
})


/**
 * Profile view for statistics.
 * @param {object} props the given properties.
 * @returns {JSX} profile view components.
*/
const Profile = (props) => {

    const [history, setHistory] = React.useState([]);
    const [statistics, setStatistics] = React.useState({
        language: {
            de: 0,
            en: 0,
            es: 0
        },
        level: {
            all: 0,
            a1: 0,
            a2: 0,
            b1: 0,
            b2: 0,
            c1: 0,
            c2: 0
        }
    })
    const [waiting, setWaiting] = React.useState(true);

    // redux state
    const { loggedIn, email, firstname, lastname } = props;

    const { theme } = props;

    const classes = useStyles(theme);

    /**
     * Loads the users search history from API and stores to state.
    */
    React.useEffect(() => {
        axios.get('https://api.elaisa.org/searchhistory', {
            params: {
                email,
                key: globals['api']['x-api-key']
            }
        }).then((response) => {
            const { data } = response;
            const { result } = data;
            const { statistics, history } = result;

            setHistory(history);
            setStatistics(statistics);
            setWaiting(false);
        }).catch((error) => {
            setWaiting(false);
        })
    }, [])

    const getMaxOfObject = (obj) => {
        let arr = Object.values(obj);
        let max = Math.max(...arr);

        for (let key in obj) {
            if (obj[key] === max) {
                return key.toUpperCase()
            }
        }
    }

    const getLanguageNameFromMaxKey = (maxLang) => {
        switch (maxLang) {
            case 'EN':
                return 'English'
            case 'ES':
                return 'Español'
            case 'DE': 
                return 'Deutsch'
            default:
                return 'None'
        }
    }

    /**
     * Returns Profile view if API request is finished.
     * @returns {JSX} Progress bar or statistics components.
    */
    const renderContent = () => {

        const { language, level } = statistics;
        const { all, a1, a2, b1, b2, c1, c2 } = level;
        const { de, en, es } = language

        // while service is fetching data, show the progress circle
        if (waiting) {
            return <div className="progress"><CircularProgress style={{ color: "grey" }} /></div>
        }
        return <div>
            <Grid
                container
                justify='center'
                className={classes.profileContent}
                direction={isMobile ? 'column' : 'row'}
                alignItems={isMobile ? 'center' : null}
            >
                <Paper className={classes.currentLevelContent}>
                    <Typography variant="h5" color="inherit" component="h5" style={{marginBottom: '5%'}}>
                       <Translate id='UI__USER__PROFILE_PAGE__MAIN_LEVEL_GRAPH' />
                    </Typography>
                    <Typography variant="h2" color='textSecondary' >
                        {getMaxOfObject(level)}
                    </Typography>
                </Paper>
                <Paper className={classes.currentLanguageContent}>
                    <Typography variant="h5" color="inherit" component="h5" style={{marginBottom: '5%'}}>
                       <Translate id='UI__USER__PROFILE_PAGE__MAIN_LANG_GRAPH' />
                    </Typography>
                    <Typography variant="h2" color='textSecondary' >
                        {getLanguageNameFromMaxKey(getMaxOfObject(language))}
                    </Typography>
                </Paper>
                <Paper className={classes.contentPaper1}>
                    <Typography variant="h5" color="inherit" component="h5">
                        <Translate id='UI__USER__PROFILE_PAGE__LEVEL_GRAPH' />
                    </Typography>
                    <PieChart dataPoints={
                        [
                            { value: all, name: "All" },
                            { value: a1, name: "A1" },
                            { value: a2, name: "A2" },
                            { value: b1, name: "B1" },
                            { value: b2, name: "B2" },
                            { value: c1, name: "C1" },
                            { value: c2, name: "C2" }
                        ]
                    }
                    />
                </Paper>
                <Paper className={classes.contentPaper2}>
                    <Typography variant="h5" color="inherit" component="h5">
                        <Translate id='UI__USER__PROFILE_PAGE__LANGUAGE_GRAPH' />
                    </Typography>
                    <PieChart dataPoints={
                        [
                            { value: en, name: "English" },
                            { value: de, name: "German" },
                            { value: es, name: "Spanish" }
                        ]
                    }
                    />
                </Paper>
            </Grid>
            <div className={classes.contentTable}>
                <EnhancedTable title={<Translate id='UI__USER__PROFILE_PAGE__SEARCH_HISTORY_TABLE__TITLE' />} data={history} />
            </div>
            <Grid container alignItems='center' justify='center' className={classes.pdfButton}>
                <PDFGenerator language={language} level={level} firstname={firstname} lastname={lastname} />
            </Grid>
        </div>
    }

    /**
     * Renders JSX content.
     * @returns {JSX} Profile.js.
    */

    return (
        <div className={classes.profileRoot}>
            <HeaderTags
                title="Elaisa Search Engine - Profile"
                desc="See your seach history and statistics about your use of the Elaisa Search Engine. Download your profile for school or studying."
                keywords="Profile, Search History, Statistics, Study, Teaching, School"
            />
            <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
            {isMobile ? null : <Divider />}
            {renderContent()}
        </div>
    );
}


/**
 * Redux store to props mapping.
 * @param {object} state the current redux store.
 * @returns {object} the props containing the redux state.
*/
const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        email: state.email,
        firstname: state.firstname,
        lastname: state.lastname
    };
};

export default connect(mapStateToProps)(withTheme(Profile));