import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';

class Results extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <NavigationBar results/>
            </div>
        );
    }
}

export default Results;