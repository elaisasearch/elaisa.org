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
export default Profile; 