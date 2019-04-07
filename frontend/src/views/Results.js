import React from 'react';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import ResultList from '../components/ResultList/ResultList';
import axios from 'axios';
import { Typography } from '@material-ui/core';


class Results extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: props.location.state.searchValue,
            language: props.location.state.language,
            level: props.location.state.level,
            resultDocs: [],
            resultDocsLength: 0,
            error: false
        }
        this.getResultDocs();
    }

    getResultDocs = () => {
        // source: https://github.com/axios/axios
        // IMPORTANT: install this on chrome: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi/related
        axios.get(`http://localhost:8080/find&query=${this.state.searchValue}`)
            .then((response) => {
                // handle success
                this.setState({
                    resultDocs: response.data,
                    resultDocsLength: response.data.length
                })
            })
            .catch((error) =>{
                // handle error
                this.setState({error: true})
            })
            .then(() =>{
                // always executed
            });
    }

    render() {
        return (
            <div>
                <NavigationBar results values={[this.state.searchValue, this.state.language, this.state.level, this.state.resultDocsLength]} />
                <Typography variant="caption">{`${this.state.resultDocsLength} results`}</Typography>
                <ResultList error={this.state.error} resultDocs={this.state.resultDocs}/>
            </div>
        );
    }
}

export default Results;