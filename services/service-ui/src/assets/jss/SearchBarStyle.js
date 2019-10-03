const styles = {
    root: {
    },
    cssLabel: {
      '&$cssFocused': {
        color: "black",
      },
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        border: '1px solid black'
      },
    },
    notchedOutline: {},
    pickers: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%"
    },
    container: {
      position: 'relative',
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      zIndex: 1,
      marginTop: '0%',
      left: 0,
      right: 0,
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '50%',
      boxShadow: 'none',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderTop: 'none'
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    }
};

export default styles;