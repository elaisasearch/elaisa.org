import React, { Component } from 'react';
import PieChart from '../components/Profile/charts/PieChart';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import '../assets/css/ProfileStyle.css';
import EnhancedTable from '../components/Profile/table/EnhancedTable';
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";


class Profile extends Component {

    state = {
        history: [],
        waiting: true
    }

    componentWillMount() {
        axios.get('http://localhost:8080/searchhistory', {
            params: {
                email: this.props.email
            }
        }).then((response) => {
            this.setState({
                history: response.data.history,
                waiting: false
            })
        }).catch((error) => {
            console.log(error.message)
            this.setState({
                waiting: false
            })
        })
    }


    renderContent() {
        // while service is fetching data, show the progress circle
        if (this.state.waiting) {
            return <div className="progress"><CircularProgress style={{ color: "grey" }} /></div>
        }
        return <div>
            <div className="content">
                <Paper className="contentPaper1">
                    <PieChart dataPoints={
                        [
                            { y: 7, label: "A1" },
                            { y: 5, label: "A2" },
                            { y: 19, label: "B1" },
                            { y: 65, label: "B2" },
                            { y: 3, label: "C1" },
                            { y: 1, label: "C2" }
                        ]
                    }
                        title="Level"
                    />
                </Paper>
                <Paper className="contentPaper2">
                    <PieChart dataPoints={
                        [
                            { y: 56, label: "English" },
                            { y: 24, label: "German" },
                            { y: 20, label: "Spanish" }
                        ]
                    }
                        title="Language"
                    />
                </Paper>
            </div>
            <div className="contentTable">
                <EnhancedTable title="Search History" data={this.state.history} />
            </div>
        </div>
    }

    render() {

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