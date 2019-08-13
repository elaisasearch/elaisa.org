const styles = {
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "transparent",
      boxShadow: "none"
    },
    menu: {
      color: "black"
    },
    filterBar: {
      marginLeft: "9vh", 
      padding: "1vh", 
      display: "flex", 
      flexGrow: 1
    },
    defaultContent: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-end"
    },
    elaisaText: {
      width: "90%",
      maxWidth: "100px",
      marginLeft: "4.5vh",
      marginRight: "1%"
    },
    elaisaButton: {
      backgroundColor: 'transparent',
      "&:hover": {
        backgroundColor: "transparent"
    }
    }
  };

export default styles;