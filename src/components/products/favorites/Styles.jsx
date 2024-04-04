import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";



export const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
      textAlign: "center",
      width: 300,
      aspectRatio: "1 / 1.2",
      overflow: "visible",
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      [theme.breakpoints.down("sm")]: {
        maxWidth: 250,
      },
    },
    media: {
      height: "100%",
      paddingTop: "56.25%",
      boxShadow: " 2px 4px 27px hsla(233, 44%, 38%, 1)",
    },
  
    textBox: {
      background: "rgba(0,0,0,0.1)",
    },
  
    deleteIcon: {
      position: "absolute",
      top: 0,
      right: 0,
      color: red[500],
    },
  }));