import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(0),
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  rootShift: {
    paddingLeft: theme.spacing(20),
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  sliderContainer: {
    width: "100%"
  },

  title: {
    color: "#ffffff",
    marginBottom: "32px",
    fontSize: "2.5rem",
    fontFamily: "inherit",
    WebkitTextFillColor: "#fff",
  },
  button: {
    margin: theme.spacing(2),
  },
  tooltip: {
    fontSize: "1rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "60%",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  sliderImage: {
    objectFit: "cover",
    maxWidth: "350px",
    width: "100%",
    margin: "0 20px",
    aspectRatio: "1 / 1.4",
    borderRadius: "8px",
    transition: "ease 250ms",
    "&:hover": {
      mixBlendMode: "multiply"
    }
  },
}));
