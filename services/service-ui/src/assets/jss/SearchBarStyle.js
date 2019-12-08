const styles = theme => ({
    root: {
    },
    cssLabel: {
      '&$cssFocused': {
        color: theme.palette.text.primary,
      },
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        // border: '1px solid',
      },
    },
    notchedOutline: {},
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
});

export default styles;