import React, { Component } from 'react';
import PieChart from '../components/Profile/charts/PieChart';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import { connect } from 'react-redux';
import { Paper, Typography, Button } from '@material-ui/core';
import '../assets/css/ProfileStyle.css';
import EnhancedTable from '../components/Profile/table/EnhancedTable';
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";


class Profile extends Component {

    state = {
        history: [],
        statistics: {
            language: {
                de: 0,
                en: 0,
                es: 0
            },
            level: {
                a1: 0,
                a2: 0,
                b1: 0,
                b2: 0,
                c1: 0,
                c2: 0
            }
        },
        waiting: true
    }

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:8080/searchhistory', {
                params: {
                    email: this.props.email
                }
            });

            this.setState({
                history: response.data.history,
                waiting: false,
                statistics: response.data.statistics
            })
        } catch (error) {
            this.setState({
                waiting: false
            });
        }
    }


    renderContent() {

        const ref = React.createRef();

        const { language, level } = this.state.statistics;
        const { a1, a2, b1, b2, c1, c2 } = level;
        const { de, en, es } = language

        // while service is fetching data, show the progress circle
        if (this.state.waiting) {
            return <div className="progress"><CircularProgress style={{ color: "grey" }} /></div>
        }
        return <div>
            <div className="content">
                <Paper className="contentPaper1">
                    <Typography variant="h5" color="inherit" component="h5">
                        Level
                    </Typography>
                    <PieChart dataPoints={
                        [
                            { y: a1, label: "A1" },
                            { y: a2, label: "A2" },
                            { y: b1, label: "B1" },
                            { y: b2, label: "B2" },
                            { y: c1, label: "C1" },
                            { y: c2, label: "C2" }
                        ]
                    }
                    />
                </Paper>
                <Paper className="contentPaper2">
                    <Typography variant="h5" color="inherit" component="h5">
                        Language
                    </Typography>
                    <PieChart dataPoints={
                        [
                            { y: en, label: "English" },
                            { y: de, label: "German" },
                            { y: es, label: "Spanish" }
                        ]
                    }
                    />
                </Paper>
            </div>
            <div className="contentTable">
                <EnhancedTable title="Search History" data={this.state.history} />
            </div>
            <div className="pdfButton">
                <Button variant="contained">Generate PDF</Button>
            </div>
        </div>
    }

    render() {

        console.log(this.state)

        // redux state
        const { loggedIn, email, firstname, lastname } = this.props;

        return (
            <div>
                <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname} />
                {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        email: state.email,
        firstname: state.firstname,
        lastname: state.lastname
    };
};

export default connect(mapStateToProps)(Profile);

/*

*/