import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 100,
    objectFit: "contain"
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    lineHeight: "1"
  },
  magazineContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
  },
  magazineItem: {
    maxWidth: 400,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.4s ease",
    "&:hover": {
      transform: "scale(.95)",
    },
  },
  magazineImage: {
    width: "100%",
    aspectRatio: ".8 / .5",
    objectFit: "cover",
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    transition: "ease 250ms",
  },
  magazineDescription: {
    marginBottom: theme.spacing(2),
    height: "100px",
    overflow: "hidden",
  },
  priceTag: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
  },
  priceIcon: {
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  seeMoreButton: {
    background: "linear-gradient(to left bottom, #e7eaf1, #a3c2e9)",
    color: "#3D5D8C",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    transition: "ease 250ms",
    "&:hover": {
      boxShadow: "2px 1px 2px #a3c2e9",
    },
  },
  firstGrid: {
    width: "100%",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row-reverse",
  },
  secondGrid: {
    padding: "12px",
  },
  "@media(max-width: 767px)": {
    magazineContainer: {
      flexWrap: "wrap"
    },
    seeMoreButton: {
      fontSize: "0.7rem"
    }
  }
}));
