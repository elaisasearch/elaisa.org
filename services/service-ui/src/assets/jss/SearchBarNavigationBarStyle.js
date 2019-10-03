const styles = {
    root: {
        flexGrow:1,
        marginRight: "2%"
    },
    cssLabel: {
      '&$cssFocused': {
        color: "grey",
      },
    },
    cssFocused: {},
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        border: '1px solid black'
      },
    },
    notchedOutline: {},
};

export default styles;