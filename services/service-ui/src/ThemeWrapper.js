import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core";

const ThemeWrapper = (props) => {

    const { children } = props;

    // get current browser mode from user
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
          createMuiTheme({
            spacing: 4,
            resultItem: {
                link: {
                    color: prefersDarkMode ? '#fff' : null
                },
                keywords: {
                    color: prefersDarkMode ? '#b3e5fc' : '#00F'
                }
    
            },
            palette: {
              type: prefersDarkMode ? 'dark' : 'light',
              primary: {
                main: !prefersDarkMode ? '#424242' : '#e0e0e0'
            }
            },
          }),
        [prefersDarkMode],
      );

    return (
        <ThemeProvider theme={theme}>
           {children}
        </ThemeProvider>
    );
}

export default ThemeWrapper;