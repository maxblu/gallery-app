import React, { useState, useEffect } from "react";
import Classes from "./Layout.module.css";
import Toolbar from "../../commponents/Toolbar/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import { Button, Grid, makeStyles } from "@material-ui/core";
import NavigationItem from "../../commponents/NavigationItem/NavigationItem";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../store/actions";
import { useHistory } from "react-router-dom";
import Footer from "../../commponents/Footer/Footer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [showSideDrower, setshowSideDrower] = useState(false);
  const [title, setTitle] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const auth = useSelector((state) => state.token, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    switch (history.location.pathname) {
      case "/home":
        setTitle("Galería");
        break;
      case "/admin":
        setTitle("Panel de Administración");
        break;
      case "/login":
        setTitle("");
        break;

      default:
        break;
    }
  }, [history.location.pathname]);

  useEffect(() => {
    auth ? setIsAuth(true) : setIsAuth(false);
  }, [auth]);

  const sideDrawerClosedHandler = () => {
    setshowSideDrower(false);
  };

  const sideDrawerOpendHandler = () => {
    setshowSideDrower(!showSideDrower);
  };

  const handleLoging = () => {
    sideDrawerClosedHandler();
    history.push("/login");
  };

  const handleLogOut = () => {
    dispatch(actions.logout());
    history.replace("/home");
  };

  let drawer_items = (
    <Grid container justify="center" alignContent="center" alignItems="center">
      <Grid item xs={12}>
        <NavigationItem
          sideDrawerHandler={sideDrawerClosedHandler}
          link="/home"
        >
          Galería
        </NavigationItem>
      </Grid>
      <Grid item xs={12}>
        <NavigationItem
          sideDrawerHandler={sideDrawerClosedHandler}
          link="/login"
        >
          Entrar
        </NavigationItem>
      </Grid>
    </Grid>
  );

  if (isAuth) {
    drawer_items = (
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          style={{
            width: "15%",
          }}
        >
          <NavigationItem
            sideDrawerHandler={sideDrawerClosedHandler}
            link="/admin"
          >
            Administración
          </NavigationItem>
        </Grid>
        <Grid item xs={12} style={{}}>
          <NavigationItem
            sideDrawerHandler={sideDrawerClosedHandler}
            link="/admin"
          >
            Salir
          </NavigationItem>
        </Grid>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid container justify="center" alignContent="center">
        <Grid item xs={12}>
          <Toolbar
            title={title}
            show={sideDrawerOpendHandler}
            logout={handleLogOut}
            isAuth={isAuth}
            loginButtonHandler={handleLoging}
          ></Toolbar>
        </Grid>
        <Grid item>
          <Drawer open={showSideDrower} onClose={sideDrawerClosedHandler}>
            {drawer_items}
          </Drawer>
        </Grid>
        <Grid item xs={12}>
          <main className={Classes.content}>{props.children}</main>
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Layout;
