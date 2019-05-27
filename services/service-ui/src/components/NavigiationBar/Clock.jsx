import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/ClockStyle.css';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }
    render() {
        return (
            <Typography className="clock" variant="subtitle1" color="textSecondary">
                {this.state.time}
            </Typography>
        );
    }
}

export default Clock;