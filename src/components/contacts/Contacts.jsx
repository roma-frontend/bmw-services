import React from "react";
import withOpacity from "../hoc/WithOpacity";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import Link from "@material-ui/core/Link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    backgroundColor: 'transparent',
    transition: "ease 250ms",

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderRadius: "50%"
    }
  },

  social: {
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

  linkPhone: {
    display: "flex",
    textDecoration: "none",
    color: "#000",
    transition: "all ease 0.15s",

    "&:hover": {
      color: "inherit",
    },
  },
  linkMail: {
    display: "flex",
    textDecoration: "none",
    color: "#000",
    transition: "all ease 0.15s",

    "&:hover": {
      color: "inherit",
    },
  },

  social__link: {
    lineHeight: ".5"
  },

  midColumn: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(4),
    },
  },

  contacts: {
    background: "linear-gradient(to left bottom, #f2bddb, #e6bce1, #d9bce5, #cabde8, #bbbde9, #aec0ea, #a3c2e9, #98c4e6, #90c8e2, #8dcbdb, #8fcdd4, #94cfcb)",
    minHeight: "100vh",
    padding: "100px 0 100px",
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },

  contact__title: {
    fontSize: '42px',
    letterSpacing: "1px"
  },

  contact_container: {
    paddingTop: "0",
    paddingBottom: "0"
  },

  contactTitle: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
    marginBottom: "1em"
  },

  contactSubtitle: {
    fontFamily: "inherit"
  },
  gridContainer: {
    width: "100%",
    margin: "0"
  },
  "@media(max-width: 767px)": {
    contacts: {
      paddingTop: "130px"
    }
  }
  
}));

function Contact(props) {
  const classes = useStyles();

  const content = {
    header: "If you have any questions, please contact us.",
    description:
      "Thank you for visiting our website. We would love to hear from you! Please feel free to contact us with any questions!",
    contact1: "Address",
    "contact1-desc1": "1652 Cordia Cir",
    "contact1-desc2": " Newton, North Carolina(NC), 28658",
    contact2: "Email",
    "contact2-desc": "romangulanyan@gmail.com",
    contact3: "Social Media",
    contact4: "Phone",
    "contact4-desc": "(099) 00-50-98",
    ...props.content,
  };

  return (
    <section className={classes.contacts}>
      <h1 className={classes.contact__title}>Contact Us</h1>
      <Container maxWidth="lg" className={classes.contact_container}>
        <Box py={5}>
          <Grid container spacing={6} className={classes.gridContainer}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" component="h2" gutterBottom={true} className={classes.contactTitle}>
                {content["header"]}
              </Typography>
              <Typography
                className={classes.contactSubtitle}
                variant="subtitle1"
                color="textSecondary"
                paragraph={true}
              >
                {content["description"]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className={classes.midColumn}>
                <Box display="flex" mb={3}>
                  <div>
                    <Avatar className={classes.iconWrapper}>
                      <RoomIcon color="primary" fontSize="small" />
                    </Avatar>
                  </div>
                  <Box ml={2}>
                    <Typography variant="h6" gutterBottom={true}>
                      {content["contact1"]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {content["contact1-desc1"]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {content["contact1-desc2"]}
                    </Typography>
                  </Box>
                </Box>
                <a href="mailto:test@test.com" className={classes.linkMail}>
                  <Box display="flex">
                    <div>
                      <Avatar className={classes.iconWrapper}>
                        <EmailIcon color="primary" fontSize="small" />
                      </Avatar>
                    </div>

                    <Box ml={2}>
                      <Typography variant="h6" gutterBottom={true}>
                        {content["contact2"]}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {content["contact2-desc"]}
                      </Typography>
                    </Box>
                  </Box>
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box display="flex" mb={3}>
                <div>
                  <Avatar className={classes.iconWrapper}>
                    <WebAssetIcon color="primary" fontSize="small" />
                  </Avatar>
                </div>
                <Box ml={2} className={classes.social}>
                  <Typography variant="h6" gutterBottom={true}>
                    {content["contact3"]}
                  </Typography>
                  <IconButton color="inherit" className={classes.social__link}>
                    <Link
                      className="face"
                      href="http://www.facebook.com"
                      target="_blank"
                      rel="noopener"
                      aria-label="Facebook"
                    >
                      <FaFacebook />
                    </Link>
                  </IconButton>
                  <IconButton color="inherit" className={classes.social__link}>
                    <Link
                      className="twit"
                      href="http://www.twitter.com"
                      target="_blank"
                      rel="noopener"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </Link>
                  </IconButton>
                  <IconButton color="inherit" className={classes.social__link}>
                    <Link
                      className="link"
                      href="http://www.linkedin.com"
                      target="_blank"
                      rel="noopener"
                      aria-label="Linkedin"
                    >
                      <FaLinkedin />
                    </Link>
                  </IconButton>
                  <IconButton color="inherit" className={classes.social__link}>
                    <Link
                      className="inst"
                      href="http://www.instagram.com"
                      target="_blank"
                      rel="noopener"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </Link>
                  </IconButton>
                </Box>
              </Box>
              <a href="tel:+37499005098" className={classes.linkPhone}>
                <div>
                  <Avatar className={classes.iconWrapper}>
                    <PhoneIcon color="primary" fontSize="small" />
                  </Avatar>
                </div>
                <Box ml={2}>
                  <Typography variant="h6" gutterBottom={true}>
                    {content["contact4"]}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {content["contact4-desc"]}
                  </Typography>
                </Box>
              </a>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

export default withOpacity(Contact);
