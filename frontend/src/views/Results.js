import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';

class Results extends React.Component {

    render() {
        const searchValue = this.props.location.state.searchValue;

        return (
            <div>
                <NavigationBar results value={searchValue}/>
            </div>
        );
    }
}

export default Results;