import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BuildIcon from "@material-ui/icons/Build";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import HomeButton from "../button/Button";
import "./Dashboard.scss";
import useStyles from "./Style";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const classes = useStyles();
  const AppbarRef = useRef(null);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");

  function handlePageChange(path) {
    navigate(path);
    setSelectedItem(path);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (AppbarRef.current && scrollY > 64) {
        AppbarRef.current.style.transition = "transform 0.5s ease";
        AppbarRef.current.style.transform = "translateY(-6px)";
        AppbarRef.current.style.boxShadow = "0 5px 30px 10px #D2D9EE";
      } else if (AppbarRef.current) {
        AppbarRef.current.style.transform = "translateY(0)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        ref={AppbarRef}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.dashboardTitle}>
            Dashboard
          </Typography>
        </Toolbar>
        <HomeButton />
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.paperAnchorLeft]: true,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List
          className={classes.list}
          onClick={(event) => event.stopPropagation()}
        >
          <ListItem
          style={{ color: '#3D5D8C' }}
            button
            selected={selectedItem === "/main"}
            onClick={() => handlePageChange("/main")}
            
            className={clsx(classes.listItem, {
              [classes.selectedListItem]: selectedItem === "/main",
            })}
          >
            <ListItemIcon style={{ color: '#3D5D8C' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
          style={{ color: '#3D5D8C' }}
            button
            selected={selectedItem === "/clients"}
            onClick={() => handlePageChange("/clients")}
            
            className={clsx(classes.listItem, {
              [classes.selectedListItem]: selectedItem === "/clients",
            })}
          >
            <ListItemIcon style={{ color: '#3D5D8C' }}> 
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>
          <ListItem
          style={{ color: '#3D5D8C' }}
            button
            selected={selectedItem === "/expenses"}
            onClick={() => handlePageChange("/expenses")}
            
            className={clsx(classes.listItem, {
              [classes.selectedListItem]: selectedItem === "/expenses",
            })}
          >
            <ListItemIcon style={{ color: '#3D5D8C' }}>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Expenses" />
          </ListItem>
          <ListItem button  style={{ color: '#3D5D8C' }}>
            <ListItemIcon style={{ color: '#3D5D8C' }}>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Equipment" />
          </ListItem>
          <ListItem button  style={{ color: '#3D5D8C' }}>
            <ListItemIcon style={{ color: '#3D5D8C' }}>
              <SettingsInputComponentIcon />
            </ListItemIcon>
            <ListItemText primary="Spare Parts" />
          </ListItem>
          <ListItem button  style={{ color: '#3D5D8C' }}>
            <ListItemIcon style={{ color: '#3D5D8C' }}>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Questions" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list} style={{ color: '#3D5D8C' }}>
          <ListItem button>
            <ListItemIcon style={{ color: '#3D5D8C' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Dashboard;