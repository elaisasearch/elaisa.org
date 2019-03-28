import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';

class Results extends React.Component {

    render() {
        const searchValue = this.props.location.state.searchValue;
        const language = this.props.location.state.language;
        const level = this.props.location.state.level

        return (
            <div>
                <NavigationBar results values={[searchValue, language, level]}/>
            </div>
        );
    }
}

export default Results;