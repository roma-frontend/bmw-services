import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Box,
  Menu,
  IconButton,
  Avatar,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";
import myAvatar from "../../assets/5.png";
import { setUser } from "../../store/slice/auth.slice";
import { setLoader } from "../../store/slice/global.slice";
import logo from "../../assets/4.png";
import useStyles from "./styles";

import "./Header.scss";
import WithOpacity from "../hoc/WithOpacity";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const headerRef = useRef(null);
  const linkBoxRef = useRef(null);
  const [linkBoxOpen, setLinkBoxOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (headerRef.current && scrollY > 64) {
        headerRef.current.style.transform = "translateY(-6px)";
        headerRef.current.style.background =
          "background-image: linear-gradient(to right top, #d1d1d1, #d8d7db, #e1dce6, #eae2ef, #f4e7f8)";
      } else if (headerRef.current && linkBoxRef.current) {
        headerRef.current.style.transform = "translateY(0)";
      }

      if(window.innerWidth <= 767 && linkBoxRef.current && scrollY > 64) {
        linkBoxRef.current.style.transition = "ease 250ms";
        linkBoxRef.current.style.display = "none";
      } else {
        linkBoxRef.current.style.transition = "ease 250ms";
        linkBoxRef.current.style.display = "flex";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    setLinkBoxOpen((prevLinkBoxOpen) => !prevLinkBoxOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("_token");
    if (token && !user) {
      dispatch(setUser({ token }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setMenuOpen(false);
    }
  }, [user]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  useEffect(() => {
    if (handleMenuOpen) {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = `0px`;
    }
  }, [handleMenuOpen]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLoader(true));
    localStorage.removeItem("_token");
    const redirectPath = localStorage.getItem("_redirectPath");
    if (redirectPath) {
      localStorage.removeItem("_redirectPath");
      navigate("/login", { state: { redirectPath } });
      dispatch(setLoader(false));
    } else {
      dispatch(setUser(null));
      setMenuOpen(false);
      navigate("/login");
    }
  };

  const renderAuthButtons = () => {
    const token = localStorage.getItem("_token");
    if (!token) {
      return (
        <div className={classes.btnBox} fontFamily="Poppins">
          <Button
            color="inherit"
            component={NavLink}
            to="/login"
            className={classes.navLink}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/register"
            className={classes.navLink}
          >
            Register
          </Button>
        </div>
      );
    } else {
      return (
        <Box className={classes.btnBox} fontFamily="Poppins">
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
            disabled={!user}
          >
            <Avatar alt="My Avatar" src={myAvatar} width="120" height="60" />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={menuOpen && Boolean(anchorEl)}
            onClose={handleMenuClose}
            classes={{ paper: classes.menuPaper }}
          >
            <MenuItem className={classes.linkItem} onClick={handleMenuClose}>
              <NavLink className={`${classes.navLink} ul-links `} to="/main">
                Dashboard
              </NavLink>
            </MenuItem>
            <MenuItem className={classes.linkItem} onClick={handleMenuClose}>
              <NavLink
                className={`${classes.navLink} ul-links `}
                to="/create-product"
              >
                Create Product
              </NavLink>
            </MenuItem>
            <MenuItem className={classes.linkItem} onClick={handleMenuClose}>
              <NavLink
                className={`${classes.navLink} ul-links `}
                to="/favorite-products"
              >
                Favorites
              </NavLink>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              className={`${classes.linkItem} ${classes.linkItemOut}`}
            >
              <NavLink
                className={`${classes.navLink} ${classes.logout} ul-links`}
                onClick={handleMenuClose}
              >
                Logout
              </NavLink>
            </MenuItem>
          </Menu>
        </Box>
      );
    }
  };

  return (
    <AppBar
      position="static"
      className={classes.header}
      ref={headerRef}
      fontFamily="Poppins"
    >
      <Container className={classes.navContainer}>
        <Toolbar className={classes.navBar}>
          <NavLink to="/" className={`${classes.navLink} logo`}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </NavLink>
          <Box
            ref={linkBoxRef}
            className={`${classes.linkBox} ${
              linkBoxOpen ? "visible" : ""
            } link-box`}
            fontFamily="Poppins"
          >
            <Button
              color="inherit"
              component={NavLink}
              to="/"
              className={`${classes.navLink} mainNav`}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/products"
              className={`${classes.navLink} mainNav`}
            >
              Products
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/blogs"
              className={`${classes.navLink} mainNav`}
            >
              Blog
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to="/contacts"
              className={`${classes.navLink} mainNav`}
            >
              Contacts
            </Button>
          </Box>
          <IconButton
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            className={classes.menuIcon}
            onClick={handleMenuToggle}
          >
            {linkBoxOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {renderAuthButtons()}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default WithOpacity(Header);
