import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
    },
    blogContainer: {
      maxWidth: "1140px",
    },
    blogContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      columnGap: "50px",
      marginBottom: "50px"
    },
    title: {
      fontWeight: "bold",
      marginBottom: theme.spacing(10),
      textAlign: "center",
    },
    subtitle: {
      textAlign: "left",
      fontSize: "18px",
      maxWidth: "500px",
    },
    image: {
      width: "550px",
      height: "auto",
      marginBottom: theme.spacing(4),
      borderRadius: "8px",
    },
    "@media(max-width: 991px)": {
      blogContainer: {
        padding: "0 15px"
      },
      blogContent: {
        flexDirection: "column"
      },
      title: {
       fontSize: "2.5rem"
      }
    }
  }));