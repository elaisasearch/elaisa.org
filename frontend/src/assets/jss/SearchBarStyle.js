const styles = {
    root: {
    },
    margin: {
      width: "50%",
      marginTop: "5%",
      marginBottom: "1%"
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
};

export default styles;