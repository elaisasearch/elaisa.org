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
    }
};

export default styles;