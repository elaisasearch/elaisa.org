import React, { Component } from 'react';
import PieChart from '../components/Profile/charts/PieChart';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {

        // redux state
        const { loggedIn, email, firstname, lastname } = this.props;

        return (
            <div>
                <NavigationBar loggedIn={loggedIn} email={email} firstname={firstname} lastname={lastname}/>
                <div style={{marginTop: "5%"}}>
                    <PieChart dataPoints={
                        [
                            { y: 7, label: "A1" },
                            { y: 5, label: "A2" },
                            { y: 19, label: "B1" },
                            { y: 65, label: "B2" },
                            { y: 3, label: "C1" },
                            { y: 1, label: "C2" }
                        ]
                    } />
                </div>
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