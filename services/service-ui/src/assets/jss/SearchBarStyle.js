const styles = {
    root: {
    },
    cssLabel: {
      '&$cssFocused': {
        color: "grey",
      },
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        borderColor: "grey",
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
      marginTop: '0.5%',
      left: 0,
      right: 0,
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '50%'
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