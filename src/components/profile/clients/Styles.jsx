import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: theme.spacing(15),
      transition: theme.transitions.create("margin-left", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    rootShift: {
      marginLeft: theme.spacing(35),
      transition: theme.transitions.create("margin-left", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      textAlign: "center",
      marginBottom: theme.spacing(3),
    },
    table: {
      minWidth: 650,
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  
    tableBox: {
      maxWidth: "900px",
      padding: "10px",
      background:
        "linear-gradient(to right bottom, #d5f1ee, #c9edf2, #bfe9f7, #bce3fc, #bfdbff, #c0dcff, #c2ddff, #c3deff, #c4e8ff, #caf1ff, #d4f8fd, #e2fffd)",
      borderRadius: "10px",
    },
  
    form: {
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      borderRadius: "16px",
      rowGap: "15px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: theme.spacing(3),
    },
  
    gridItem: {
      width: "100%",
    },
  
    fieldBox: {
      padding: "5px",
      width: "100%",
    },
  
    formInput: {
      width: "100%",
    },
    addButton: {
      background:
        "linear-gradient(to left bottom, #c0deff, #c1dfff, #c1e1ff, #c2e2ff, #c3e3ff, #c6e3ff, #c9e3ff, #cce3ff, #d3e1ff, #dbdfff, #e5ddff, #efdaff)",
      color: "#3D5D8C",
      width: "100%",
    },
    viewButton: {
      color: theme.palette.primary.main,
    },
    card: {
      height: "100%",
    },
    deleteButton: {
      color: theme.palette.error.main,
    },
    canvasBox: {
      width: "100%",
    },
    
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: "none",
      textAlign: "center",
    },
    
    slider: {
      padding: theme.spacing(2),
      "& .slick-prev:before, & .slick-next:before": {
        color: "#000",
      },
      "& .slick-dots li button:before": {
        color: "#000",
      },
    },
  }));

  export default useStyles;