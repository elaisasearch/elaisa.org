import { createMuiTheme } from "@material-ui/core";


let lightMode = false;

export const theme = createMuiTheme({
    spacing: 4,
    resultItem: {
        link: {
            color: !lightMode ? '#fff' : null
        },
        keywords: {
            color: !lightMode ? '#b3e5fc' : '#00F'
        }
        
    },
    palette: {
        type: lightMode ? 'light' : 'dark',
        primary: {
            main: lightMode ? '#424242' : '#e0e0e0'
        }
    }
});