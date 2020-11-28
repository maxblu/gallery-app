import React, { useState, useEffect } from "react";
import Classes from "./Layout.module.css";
import Toolbar from "../../commponents/Toolbar/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import { Divider, Grid } from "@material-ui/core";
import NavigationItem from "../../commponents/NavigationItem/NavigationItem";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../store/actions";
import { useHistory } from "react-router-dom";

const Layout = (props) => {
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

  return (
    <Grid container justify="center" alignContent="center">
      <Grid
        item
        // className={classes.Toolbar}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
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
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <NavigationItem
                sideDrawerHandler={sideDrawerClosedHandler}
                link="/home"
              >
                Galería
              </NavigationItem>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}>
              {isAuth ? (
                <NavigationItem
                  sideDrawerHandler={sideDrawerClosedHandler}
                  link="/admin"
                >
                  Administracion
                </NavigationItem>
              ) : (
                <NavigationItem
                  sideDrawerHandler={sideDrawerClosedHandler}
                  link="/login"
                >
                  Entrar
                </NavigationItem>
              )}
            </Grid>
          </Grid>
        </Drawer>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <main className={Classes.content}>{props.children}</main>
      </Grid>
    </Grid>
  );
};

export default Layout;
