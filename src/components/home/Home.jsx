import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import WithOpacity from "../hoc/WithOpacity";
import "./Home.scss";

const useStyles = makeStyles((theme) => ({
  section: {
    position: "relative",
    minHeight: "100vh",
    background:
      "linear-gradient(to left bottom, #f2bddb, #e6bce1, #d9bce5, #cabde8, #bbbde9, #aec0ea, #a3c2e9, #98c4e6, #90c8e2, #8dcbdb, #8fcdd4, #94cfcb)",
    paddingTop: theme.spacing(12),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(5),
    },
  },

  h1: {
    fontFamily: "inherit",
    marginBottom: "2.5rem",
  },
  description: {
    maxWidth: "670px",
    marginBottom: "24px",
    fontFamily: "inherit",
    color: "#333",
  },
  primaryAction: {
    display: "inline-block",
    lineHeight: "25px",
    fontFamily: "inherit",
    marginRight: theme.spacing(2),
    background: "linear-gradient(to left bottom, #e7eaf1, #a3c2e9)",
    color: "#3D5D8C",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
    transition: "ease 250ms",
    "&:hover": {
      boxShadow: "2px 1px 2px #a3c2e9",
    },
  },
  secondaryAction: {
    display: "inline-block",
    lineHeight: "25px",
    fontFamily: "inherit",
    color: "#3D5D8C",
    borderColor: "#3d5d8c8c",
    transition: "ease 250ms",
    "&:hover": {
      background: "#95b8e5",
      borderColor: "transparent",
    },
  },
  span2: {
    fontFamily: "inherit",
    fontSize: "3,2rem",
    color: "#3D5D8C",
  },
  "@media (max-width: 767px)": {
    span2: {
      fontSize: "2.4rem",
    },
    section: {
      paddingTop: "150px",
      paddingBottom: "30px",
    },
    secondaryAction: {
      fontSize: "0.7em",
    },
    primaryAction: {
      fontSize: "0.7em",
    },
    h1: {
      lineHeight: "1",
    },
  },
  "@media (max-width: 575px)": {
    span2: {
      fontSize: "2rem",
    },
    h1: {
      lineHeight: ".6",
    },
  },
}));

function Home(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const content = {
    "header-p1": "Welcome to our website",
    "header-p2": "You will find everything you need for your business",
    description: "",
    "primary-action": "Get Started",
    "secondary-action": "Learn More",
    ...props.content,
  };

  useEffect(() => {
    const spanTexts = document.getElementsByClassName("name");

    for (let spanText of spanTexts) {
      spanText.classList.add("active");
    }
  }, []);


  return (
    <>
      <section className={classes.section}>
        <Container maxWidth="md">
          <Box textAlign="center" color="common.white">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom={true}
              className={classes.h1}
              width="60%"
            >
              <div className="back-text">
                <span className="name">
                  Welcome
                </span>
              </div>
              <Typography
                className={classes.span2}
                variant="h2"
                component="span"
              >
                {content["header-p2"]}
              </Typography>
            </Typography>
            {!user ? (
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.primaryAction}
                  onClick={() => navigate("/preview")}
                >
                  {content["primary-action"]}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.secondaryAction}
                  onClick={() => navigate("/preview")}
                >
                  {content["secondary-action"]}
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.secondaryAction}
                onClick={() => navigate("/preview")}
              >
                {content["secondary-action"]}
              </Button>
            )}
          </Box>
        </Container>
      </section>
    </>
  );
}

export default WithOpacity(Home);
