import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IntlContext from "./intlContext";
import messages from "./messages";
import { useSpring, animated } from "react-spring";
import useStyles from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = (props) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();

  const { copy, link1, link2, link3, link4 } = props.content || {};

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.example.com/subscribe?email=${email}`
      );
      if (response.ok) {
        toast.success("You have successfully subscribed!");
        window.location.href = `mailto:romangulanyan@gmail.com?subject=Subscription&body=${email}`;
        setEmail("");
      } else {
        toast.error(
          "There was a problem with the subscription. Please try again later."
        );
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    setEmail("");
  };

  const [iconHover, setIconHover] = useState(false);

  const iconSpring = useSpring({
    transform: iconHover ? "scale(1.2)" : "scale(1)",
    cursor: "pointer",
  });

  return (
    <IntlContext.Provider value={{ locale: "en", messages }}>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Box
            py={6}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gridRowGap="40px"
            className={classes.rootBox}
          >
            <Box component="nav" className={classes.footerNav}>
              <Link
                href="/products"
                onClick={() => navigate("/products")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {link1 || "Products"}
              </Link>
              <Link
                href="/preview"
                onClick={() => navigate("/preview")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {link2 || "Services"}
              </Link>
              <Link
                href="/"
                onClick={() => navigate("/")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {link3 || "Team Privacy"}
              </Link>
              <Link
                href="/contacts"
                onClick={() => navigate("/contacts")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                {link4 || "Contacts"}
              </Link>
              <Link
                href="/"
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
                onClick={() => navigate("/")}
              >
                Site Map
              </Link>
              <Link
                href="/blogs"
                onClick={() => navigate("/blogs")}
                variant="body1"
                color="textPrimary"
                className={classes.footerLink}
              >
                Blog
              </Link>
            </Box>
            <Box
              className={classes.socials}
              display="flex"
              alignItems="center"
              gridColumnGap="20px"
              fontSize="25px"
              position="relative"
            >
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                  className="face"
                  href="http://www.facebook.com"
                  target="_blank"
                  title="facebook"
                  rel="noopener"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </Link>
              </animated.div>
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                  className="twit"
                  href="http://www.twitter.com"
                  target="_blank"
                  title="twitter"
                  rel="noopener"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Link>
              </animated.div>
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                  className="inst"
                  href="http://www.instagram.com"
                  target="_blank"
                  title="instagram"
                  rel="noopener"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </Link>
              </animated.div>
              <animated.div
                onMouseEnter={() => setIconHover(true)}
                onMouseLeave={() => setIconHover(false)}
                style={iconSpring}
              >
                <Link
                  className="link"
                  href="http://www.linkedin.com"
                  target="_blank"
                  title="linkedin"
                  rel="noopener"
                  aria-label="Linkedin"
                >
                  <FaLinkedin />
                </Link>
              </animated.div>
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={-1}
                content=""
                transition="all 0.3s ease"
              />
            </Box>
            <Box display="flex" alignItems="center" width="40%" className={classes.formContainer}>
              <form onSubmit={handleSubscribe} className={classes.form__box}>
                <TextField
                  className={classes.TextField}
                  fullWidth={true}
                  label={messages.emailPlaceholder.defaultMessage}
                  variant="outlined"
                  placeholder={messages.emailPlaceholder.defaultMessage}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubscribe(e);
                    }
                  }}
                />
                <Button
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  {messages.subscribeButton.defaultMessage}
                </Button>
              </form>
            </Box>
            <Typography
              className={classes.copy}
              color="textSecondary"
              component="p"
              variant="caption"
              gutterBottom={false}
            >
              {copy || "© 2023 Bmw All rights reserved."}
            </Typography>
          </Box>
        </Container>
      </footer>
      <ToastContainer />
    </IntlContext.Provider>
  );
};

export default Footer;
