import { createMuiTheme } from "@material-ui/core";
import grey from '@material-ui/core/colors/blue';


let lightMode = false;

export const theme = createMuiTheme({
    background: lightMode ? 'white' : '#212121',
    spacing: 4,
    palette: {
        type: lightMode ? 'light' : 'dark',
    }
});