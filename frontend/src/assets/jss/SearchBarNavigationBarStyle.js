const styles = {
    root: {
        flexGrow:1
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