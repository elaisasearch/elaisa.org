import React, { Component } from 'react';
import PieChart from '../components/Profile/charts/PieChart';
import NavigationBar from '../components/NavigiationBar/NavigationBar';

class Profile extends Component {
    render() {

        return (
            <div>
                <NavigationBar />
                <div style={{marginTop: "5%"}}>
                    <PieChart dataPoints={
                        [
                            { y: 32, label: "Health" },
                            { y: 22, label: "Finance" },
                            { y: 15, label: "Education" },
                            { y: 19, label: "Career" },
                            { y: 5, label: "Family" },
                            { y: 7, label: "Real Estate" }
                        ]
                    } />
                </div>
            </div>
        );
    }
}
export default Profile; 