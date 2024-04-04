import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(to left bottom,#f2bddb,#e6bce1,#d9bce5,#cabde8,#bbbde9,#aec0ea,#a3c2e9,#98c4e6,#90c8e2,#8dcbdb,#8fcdd4,#94cfcb)",
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    paddingLeft: theme.spacing(15),
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  rootShift: {
    paddingLeft: theme.spacing(35),
    transition: theme.transitions.create("padding-left", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "100px 20px 100px 20px",
  },

  table: {
    minWidth: 650,
  },
  tableBox: {
    tableBox: {
      "& td:nth-child(3), & th:nth-child(3)": {
        textAlign: "right",
        paddingRight: theme.spacing(2),
      },
      "& td:nth-child(3)::before": {
        content: "'$'",
        float: "left",
        whiteSpace: "nowrap"
      },
    },
    padding: "10px",
    background:
      "linear-gradient(to right bottom, #d5f1ee, #c9edf2, #bfe9f7, #bce3fc, #bfdbff, #c0dcff, #c2ddff, #c3deff, #c4e8ff, #caf1ff, #d4f8fd, #e2fffd)",
  },

  table__container: {
    borderRadius: "10px",
  },

  tableAdd: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "100%",
    flexBasis: "100%",
  },

  tableMainBox: {
    width: "60%",
  },

  formControl: {
    margin: "8px 0",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  imgBox: {
    margin: "0 auto",
  },

  formBox: {
    flexBasis: "30%",
  },

  fieldBox: {
    padding: "5px !important",
    width: "100%",
  },

  formChild: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "0",
  },

  chartContainer: {
    width: "50%",
    textAlign: "center",
  },

  diagramBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  tooltip: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    fontSize: "14px",
  },

  gridItem: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "0",
    },
  },

  parentForm: {
    background: `rgba(255, 255, 255, 0.9)`,
    backdropFilter: `blur(300px)`,
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "5px 5px 10px #ccc",
  },

  fields: {
    width: "100%",
  },

  formButton: {
    background:
      "linear-gradient(to left bottom, #c0deff, #c1dfff, #c1e1ff, #c2e2ff, #c3e3ff, #c6e3ff, #c9e3ff, #cce3ff, #d3e1ff, #dbdfff, #e5ddff, #efdaff)",
    color: "#3D5D8C",
  },
}));

export default useStyles;
