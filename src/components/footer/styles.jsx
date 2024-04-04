import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootBox: {
      paddingTop: '40px',
      rowGap: '30px',
      paddingBottom: '30px',

    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    color: "#fff",
    fontSize: "14px",
  },

  socials: {
    "& .face": {
      color: "#0d3899",
    },
    "& .twit": {
      color: "#1D9BF0",
    },
    "& .inst": {
      color: "#E4405F",
    },
    "& .link": {
      color: "#E68523",
    },
  },

  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "auto",
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: "auto",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  footerLink: {
    letterSpacing: '.8px',
    cursor: "pointer",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(2),
    },
    color: "#fff",
    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "&:hover": {
      textDecoration: "none",
      color: "#bcd4ec",
      transform: "translateY(-4px)",
    },
  },
  footer: {
    fontFamily: "Poppins, sans-serif",
    position: 'sticky',
    width: "100%",
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    marginTop: 'auto',
    backgroundColor: "#3d5d8c",
  },

  copy: {
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    fontSize: "12px",
  },
  TextField: {
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: "inherit",
    },
  },
  form__box: {
    display: "flex",
    gap: "30px",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
      },
    },
  },
  btn: {
    width: "100%",
  },
  "@media(max-width: 991px)": {
    formContainer: {
      width: "50%"
    },
    form__box: {
      flexDirection: "column"
    },
    btn: {
      padding: "15px",
      fontSize: ".7rem"
    },
    footerLink: {
      fontSize: ".8rem"
    },
  }
}));

export default useStyles;