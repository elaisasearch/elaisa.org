import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import ResultList from '../components/ResultList/ResultList';
import axios from 'axios';

class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: props.location.state.searchValue,
            language: props.location.state.language,
            level: props.location.state.level
        }
        this.getResultDocs();
    }

    getResultDocs = () => {
        // source: https://github.com/axios/axios
        // IMPORTANT: install this on chrome: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related
        axios.get(`http://localhost:8080/find&query=${this.state.searchValue}`)
            .then(function (response) {
                // handle success
                console.log(response.data[0].documents);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render() {
        return (
            <div>
                <NavigationBar results values={[this.state.searchValue, this.state.language, this.state.level]} />
                <ResultList/>
            </div>
        );
    }
}

export default Results;