import { createMuiTheme } from "@material-ui/core";
import grey from '@material-ui/core/colors/blue';


let lightMode = false;

export const theme = createMuiTheme({
    spacing: 4,
    palette: {
        type: lightMode ? 'light' : 'dark',
        primary: {
            main: lightMode ? '#424242' : '#e0e0e0'
        } 

    }
});