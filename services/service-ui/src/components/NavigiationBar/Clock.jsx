import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/ClockStyle.css';

/**
 * The clock ticking in the Navigation Bar.
 * @param {object} props the given properties.
 * @returns {JSX} locale string date.
*/
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString()
        };
    }

    /**
     * Set intervall to 1 second after component did mount.
    */
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    /**
     * Clear the intervall if the user changes the view.
    */
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    /**
     * Change the time every second.
    */
    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }

    /**
     * Render the date time.
     * @returns {JSX} the locale date time string.
    */
    render() {
        return (
            <Typography className="clock" variant="subtitle1" color="textSecondary">
                {this.state.time}
            </Typography>
        );
    }
}

export default Clock;