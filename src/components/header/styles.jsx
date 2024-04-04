import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "transparent",
    backdropFilter: "blur(10px)",
    border: "3px solid rgba(257, 257, 257, .4)",
    borderRadius: "1vw",
    padding: "10px",
    fontFamily: "inherit",
  },

  linkItem: {
    fontFamily: "inherit",
    borderRadius: "8px",
    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },

  linkItemOut: {
    marginTop: "15px",
  },

  header: {
    height: "64px",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    boxShadow: "0 5px 30px 10px #D2D9EE",
    background:
      "linear-gradient(to left bottom, #f2bddb, #e9c2e4, #dfc7eb, #d6ccef, #ced0f1, #cfd3f0, #d0d6ef, #d2d9ee, #d9dded, #e0e0eb, #e5e5ea, #e9e9e9)",
    transition: "transform 0.5s ease",
    zIndex: 1,
  },

  logout: {
    color: "#f44336 !important",
  },

  logo: {
    width: "120px",
    aspectRatio: " 1.99",
  },
  navLink: {
    width: "auto",
    position: "relative",
    fontFamily: "inherit",
    minWidth: "auto",
    display: "inline-block",
    textDecoration: "none",
    lineHeight: "1.75",
    letterSpacing: "1px",
    color: "#3D5D8C",
  },

  btnBox: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "32px",
  },
  navBar: {
    justifyContent: "space-between",
    columnGap: "20px",
    height: "64px",
  },
  menuIcon: {
    display: "none"
  },
  "@media (max-width: 1240px)": {
    section: {
      paddingTop: "140px"
    },
  },
  "@media (max-width: 991px)": {
    navContainer: {
      padding: "0",
    },
    btnBox: {
      columnGap: "10px",
      flexWrap: "inherit",
    },
    navLink: {
      fontSize: "0.7rem",
    },
    logo: {
      width: "100px",
    },
  },
  "@media (max-width: 767px)": {
    
    navLink: {
      fontWeight: "600",
    },
    menuIcon: {
      display: "block",
      transition: "ease-in 250ms"
    },
  },
}));

export default useStyles;