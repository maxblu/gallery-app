import React from "react";
// import Logo from "../../Logo/Logo";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
// import AuthenticationButton from "../../authentication-button";
import { makeStyles } from "@material-ui/core/styles";
// import SideNavigationItems from "../SideNavigationsItems/SideNavigationsItems";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    // position: "",
    padding: "0px 0px 0px 0px",
    backgroundColor: fade(theme.palette.grey[300], 0.4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: "0px 13px 0px 12px",
  },

  title: {
    flexGrow: 1,
  },
  navlist: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    margin: "auto",
  },
  grid: {},
}));

const Mytoolbar = (props) => {
  const classes = useStyles();

  let authIconButton = null;

  props.isAuth
    ? (authIconButton = (
        <div>
          <IconButton onClick={props.logout} color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </div>
      ))
    : (authIconButton = (
        <div>
          <IconButton onClick={props.loginButtonHandler} color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      ));

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={props.show}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        {authIconButton}
      </Toolbar>
    </AppBar>
  );
};

export default Mytoolbar;
