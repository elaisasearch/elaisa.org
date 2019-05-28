import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../components/NavigiationBar/NavigationBar';
import '../assets/css/AccountStyle.css';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-gravatar';
import { Person } from '@material-ui/icons/';

const Account = (props) => {

    console.log(props.location.state);

    const { email, firstname, lastname } = props.location.state;

    const renderAvatar = (props) => {
        if (email) {
            return <Gravatar email={email} size={100}/>
        } else if (firstname && lastname) {
            return `${firstname.slice(0, 1)}${lastname.slice(0, 1)}`
        }
        return <Person />
    }

    return <div>
        <NavigationBar />
        <div className="accountView">
            <Paper className="accountPaper">
                <Avatar alt={firstname} id="accountLogo">
                    {renderAvatar(props)}
                </Avatar>
                <Typography variant="h5" component="h3">
                    {firstname} {lastname}
                </Typography>
                <Typography component="p">
                    Paper can be used to build surface or other elements for your application.
                </Typography>
            </Paper>
        </div>
    </div>
}

export default Account;